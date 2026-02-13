const express = require('express');
const path = require('path'); 
const app = express();
const port = 3000;
const saleRoutes = require('./routes/saleRoutes');

app.use(express.json());

// Phục vụ file tĩnh (UI) từ thư mục public
// Dùng path.join để nối đường dẫn chính xác: từ thư mục hiện tại (__dirname là src) lùi ra 1 cấp (..) rồi vào public
app.use(express.static(path.join(__dirname, '../public')));

// Route trang chủ: Trả về file index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Sử dụng route mua hàng
app.use('/api', saleRoutes);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));