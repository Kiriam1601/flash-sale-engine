-- 1. Bảng Users: Đơn giản, chuẩn mực
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Products: Thông tin tĩnh của sản phẩm
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL, -- Mã kho (Stock Keeping Unit)
    price DECIMAL(10, 2) NOT NULL,   -- Dùng DECIMAL cho tiền tệ, KHÔNG dùng FLOAT
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Flash_Sales (QUAN TRỌNG NHẤT)
-- Tách riêng kho "Flash Sale" ra khỏi kho thường để dễ quản lý lock
CREATE TABLE flash_sales (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    sale_price DECIMAL(10, 2) NOT NULL,
    
    total_stock INTEGER NOT NULL,     -- Tổng số lượng đem ra bán
    available_stock INTEGER NOT NULL, -- Số lượng còn lại (Hot Spot)
    
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, ended, cancelled
    
    -- Constraint "Thần thánh" để DB tự chặn overselling
    CONSTRAINT check_stock_positive CHECK (available_stock >= 0),
    CONSTRAINT check_time_valid CHECK (end_time > start_time)
);

-- 4. Bảng Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    flash_sale_id INTEGER REFERENCES flash_sales(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, success, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXING
CREATE INDEX idx_flash_sales_time ON flash_sales(start_time, end_time);
CREATE INDEX idx_flash_sales_product ON flash_sales(product_id);
CREATE INDEX idx_orders_user ON orders(user_id);

INSERT INTO products (name, sku, price) VALUES ('iPhone 15 Pro Max', 'IP15PM-256', 30000000);
INSERT INTO flash_sales (product_id, sale_price, total_stock, available_stock, start_time, end_time) VALUES (1, 1000, 100, 100, NOW(), NOW() + INTERVAL '1 day');

INSERT INTO products (name, sku, price) VALUES ('Samsung S24 Ultra', 'SS-S24U', 25000000);
INSERT INTO flash_sales (product_id, sale_price, total_stock, available_stock, start_time, end_time) 
VALUES (2, 25000000, 50, 50, NOW(), NOW() + INTERVAL '1 day');