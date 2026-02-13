const { Pool } = require('pg');
require('dotenv').config();

// Tạo một "bể" kết nối
const pool = new Pool({
    user: process.env.DB_USER,
    host: 'db', // Tên service trong docker-compose
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    // Tối ưu hóa cho production:
    max: 20, // Tối đa 20 kết nối đồng thời
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Hàm tiện ích để chạy query
const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };