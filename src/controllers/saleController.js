const db = require('../config/db');

// 1. Chức năng Mua hàng (Đã có logic chặn mua 2 lần)
exports.buyProduct = async (req, res) => {
    const userId = req.user.id;
    const { flashSaleId } = req.body;

    // Quan trọng: Tạo client kết nối ở đây
    const client = await db.pool.connect();

    try {
        await client.query('BEGIN'); // Bắt đầu giao dịch
        // --- Logic trừ kho ---
        const updateResult = await client.query(
            `UPDATE flash_sales 
             SET available_stock = available_stock - 1 
             WHERE id = $1 AND available_stock > 0 
             RETURNING *`,
            [flashSaleId]
        );

        if (updateResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Hết hàng rồi bạn ơi!' });
        }

        const sale = updateResult.rows[0];

        // --- Logic tạo đơn ---
        await client.query(
            'INSERT INTO orders (user_id, flash_sale_id, quantity, total_price) VALUES ($1, $2, 1, $3)',
            [userId, flashSaleId, sale.sale_price]
        );

        await client.query('COMMIT'); // Chốt đơn
        res.json({ message: 'Mua thành công!', price: sale.sale_price });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    } finally {
        client.release();
    }
};

// 2. Chức năng Lấy thông tin 
exports.getSaleInfo = async (req, res) => {
    try {
        // JOIN bảng flash_sales với products để lấy tên và giá gốc
        const queryText = `
            SELECT 
                fs.id as flash_sale_id,
                fs.sale_price,
                fs.available_stock,
                p.name as product_name,
                p.price as original_price,
                p.sku
            FROM flash_sales fs
            JOIN products p ON fs.product_id = p.id
            WHERE fs.status = 'active' AND fs.end_time > NOW()
            ORDER BY fs.id DESC
        `;
        
        const { rows } = await db.query(queryText);
        
        if (rows.length === 0) return res.status(200).json([]); // Trả về mảng rỗng nếu không có gì
        
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
};