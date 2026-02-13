
# ⚡ High-Performance Flash Sale Engine

Hệ thống xử lý bán hàng chớp nhoáng (Flash Sale) chịu tải cao, đảm bảo tính toàn vẹn dữ liệu (Data Consistency) và giải quyết triệt để vấn đề **Race Condition**.

## 🚀 Tính năng nổi bật
* **Xử lý đồng thời (Concurrency):** Giải quyết bài toán hàng trăm người cùng mua 1 sản phẩm cuối cùng bằng kỹ thuật **Optimistic/Pessimistic Locking** (Atomic Update) trong PostgreSQL.
* **Bảo mật (Security):** Xác thực người dùng bằng **JWT (JSON Web Token)** và mã hóa mật khẩu với **Bcrypt**.
* **RESTful API:** Cấu trúc API chuẩn, dễ dàng mở rộng.
* **Containerization:** Đóng gói toàn bộ môi trường (Node.js + PostgreSQL) bằng **Docker & Docker Compose**, triển khai chỉ với 1 lệnh.
* **Frontend:** Giao diện Real-time cập nhật tồn kho liên tục.

## 🛠️ Công nghệ sử dụng
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Connection Pooling)
* **DevOps:** Docker, Docker Compose
* **Tools:** Postman/REST Client (API Testing), JMeter/K6 (Load Testing)

## ⚙️ Cài đặt & Chạy dự án

### Yêu cầu
* Docker & Docker Compose đã được cài đặt.

### Các bước chạy chính
1. **Clone dự án:**
   ```bash
   git clone [https://github.com/username/flash-sale-engine.git](https://github.com/username/flash-sale-engine.git)
   cd flash-sale-engine

2. **Khởi động hệ thống:**
   ```bash
   docker-compose up --build

   ```

* Sau khi chạy xong, truy cập Web tại: `http://localhost:3000`



## 🔧 Các lệnh quản lý & Debug thường dùng

Dưới đây là các lệnh hữu ích để quản lý container và kiểm tra dữ liệu trong quá trình phát triển.

### 1. Kiểm tra trạng thái hệ thống

Xem danh sách các container đang chạy và trạng thái của chúng:

```bash
docker-compose ps

```

### 2. Xem Logs ứng dụng (Debug)

Theo dõi log thời gian thực của backend để bắt lỗi:

```bash
docker-compose logs -f app

```

*(Nhấn `Ctrl + C` để thoát)*

### 3. Reset hệ thống (Dọn dẹp & Build lại)

Sử dụng khi bạn muốn xóa sạch dữ liệu cũ (Database), xóa các image lỗi và khởi động lại từ đầu:

```bash
# Xóa container và volume (dữ liệu DB sẽ mất)
docker-compose down -v

# Build lại và khởi chạy ngầm (detached mode)
docker-compose up --build -d

```

### 4. Truy cập Database trực tiếp

Vào bên trong container PostgreSQL để chạy các câu lệnh SQL thủ công:

```bash
docker exec -it flash-sale-db psql -U nam_admin -d flash_sale_db

```

**Các lệnh SQL hữu ích:**

* `\dt` : Xem danh sách các bảng.
* `SELECT * FROM users;` : Xem danh sách người dùng.
* `SELECT * FROM flash_sales;` : Xem kho hàng.

## 🧪 Kịch bản Test (Stress Test)

Dự án bao gồm script `tests/stress-test.js` để giả lập tình huống nhiều người dùng bấm mua cùng lúc.

**Chạy test:**

```bash
node tests/stress-test.js

```
