# Sử dụng Node.js LTS bản nhẹ
FROM node:20-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package files để tận dụng Docker cache cho node_modules
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ code vào container
COPY . .

# Mở port cho ứng dụng
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "run", "dev"]