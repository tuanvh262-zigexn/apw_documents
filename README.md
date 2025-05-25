# apw-designs
<p align="center">
  <a href="">
    <img src="https://dew8lut0z0dqr.cloudfront.net/nuxt_web/dist/client/img/6173dcb.svg" width="300">
  </a>
</p>

<h1 align="center">apw-designs</h1>

## Tổng quan
Kho lưu trữ này được sử dụng để quản lý các tài liệu thiết kế.

### Cách xem tài liệu thiết kế trên môi trường cục bộ

Bạn có thể xem tài liệu thiết kế trên môi trường cục bộ bằng cách làm theo các bước sau:

```bash
# Sao chép (clone) kho lưu trữ (chỉ thực hiện lần đầu tiên)
git clone git@github.com:tuanvh262-zigexn/apw_documents.git
cd apw_documents

# Cài đặt các phụ thuộc (dependencies)
yarn install

# Khởi động máy chủ phát triển
yarn run docs:dev
```

Bạn có thể xem tài liệu thiết kế bằng cách mở trình duyệt và truy cập địa chỉ: `http://localhost:5175`

### Cách thêm hoặc chỉnh sửa tài liệu

1. Tạo hoặc chỉnh sửa file Markdown tại vị trí phù hợp trong thư mục `docs`
2. Commit và push các thay đổi
3. Nếu cần, cập nhật cấu hình điều hướng trong file `.vitepress/config.js`
