const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_mac_dinh_cho_dev';

module.exports = (req, res, next) => {
    // 1. Lấy token từ Header (Dạng: "Bearer <token>")
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });

    try {
        // 2. Giải mã token
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Gán thông tin user (id, email) vào request
        next(); // Cho phép đi tiếp
    } catch (err) {
        res.status(400).json({ message: 'Token không hợp lệ' });
    }
};