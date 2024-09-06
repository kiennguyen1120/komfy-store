# Sử dụng Node.js làm base image
FROM node:20-alpine3.17 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để serve ứng dụng
FROM nginx:1.19-alpine

# Sao chép thư mục build từ bước trước
COPY --from=builder /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]