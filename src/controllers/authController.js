// src/controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    // 1. Lấy thông tin từ người dùng gửi lên
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập đủ email và mật khẩu' });
    }

    try {
        // 2. Mã hóa mật khẩu (Quan trọng!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Lưu vào Database
        // RETURNING id, email: Trả về thông tin user vừa tạo (trừ password)
        const { rows } = await db.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Đăng ký thành công!', 
            user: rows[0] 
        });

    } catch (err) {
        console.error(err);
        // Mã lỗi 23505 của PostgreSQL nghĩa là bị trùng lặp (Unique violation)
        if (err.code === '23505') {
            return res.status(400).json({ message: 'Email này đã tồn tại rồi!' });
        }
        res.status(500).json({ error: 'Lỗi server' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || 'secret_mac_dinh_cho_dev';

    try {
        // 1. Tìm user theo email
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = rows[0];
        
        if (!user) {
            return res.status(400).json({ message: 'Email không tồn tại' });
        }

        // 2. So sánh mật khẩu (password nhập vào vs password đã mã hóa trong DB)
        const validPass = await bcrypt.compare(password, user.password_hash);
        
        if (!validPass) {
            return res.status(400).json({ message: 'Sai mật khẩu rồi!' });
        }

        // 3. Tạo Token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Đăng nhập thành công', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server' });
    }
};