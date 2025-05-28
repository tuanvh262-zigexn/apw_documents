---
title: Lời mở đầu
---
# Lời mở đầu

Tài liệu này giải thích về quy trình thiết kế trong phát triển và cách tạo tài liệu thiết kế.

## Thiết kế trong phát triển
Trong quá trình phát triển, trước khi bắt đầu lập trình, nhóm phát triển sẽ tạo tài liệu thiết kế.

Việc chuẩn bị tài liệu thiết kế trước khi bắt đầu triển khai giúp nâng cao chất lượng phát triển và giảm thiểu việc làm lại, do đó quy trình tạo và phê duyệt tài liệu thiết kế đã được thiết lập.

Quy trình thiết kế được chia thành hai loại chính:

1. **Phát triển chức năng mới**
2. **Sửa lỗi (bug fix)**

## Cấu trúc tài liệu

Tài liệu này bao gồm các phần sau:

1. **Chức năng mới**
2. **Sửa lỗi**
   - Tài liệu thiết kế liên quan đến việc sửa các lỗi trong chức năng đã có

## Các loại tài liệu thiết kế

### Tài liệu thiết kế cơ bản (Basic Design)
Dùng để mô tả tổng quan về hệ thống được phát triển. Bắt buộc phải tạo khi phát triển chức năng mới.

[Định dạng tài liệu thiết kế cơ bản](./basic-design-format.md)

#### Mục đích:
- Xác định định hướng thiết kế toàn hệ thống
- Rà soát cấu trúc hạ tầng, kiến trúc và mô hình dữ liệu

#### Nội dung bao gồm:
- Mục đích và tổng quan chức năng
- Tổng quan cấu trúc hệ thống
- Định hướng thiết kế kiến trúc
- Cấu trúc hạ tầng
- Mô hình dữ liệu
- Luồng xử lý cơ bản

#### Vị trí lưu file:
Các tài liệu thiết kế cơ bản có thể tìm thấy ở đây:
```
/feature/[Chức năng]/[RedmineID]/basic_design.md
```

Ví du:
```
/feature/reports/123/basic_design.md
```

#### Đối với sửa lỗi
Tài liệu ghi lại phân tích nguyên nhân lỗi và phương án sửa chữa.

[Thiết kế sửa lỗi](./bugfix-design-format.md)

#### Vị trí lưu file:
- **Sửa lỗi:**:
  ```
  /fix/[Chức năng]/[RedmineID].md
  ```
  Ví du:
  ```
  /fix/reports/123.md
  ```

## Cách tạo tài liệu

Tài liệu này sử dụng VitePress để tạo.
Để thêm tài liệu thiết kế mới, thực hiện các bước sau:

1. **Chọn thư mục phù hợp**
   - Chức năng mới: `/feature/[loại chức năng]/[ID ticket]/`
   - Sửa lỗi: `/fix/[loại chức năng]/[ID ticket].md`

2. **Tạo tài liệu thiết kế**
   - Thiết kế cơ bản: `basic_design.md`

3. **Thêm vào sidebar**
   - Chỉnh sửa file `docs/.vitepress/config.mts`
   - Thêm đường dẫn đến tài liệu mới vào sidebar ở phần phù hợp (chức năng mới hoặc sửa lỗi).

4. **Kiểm tra nội dung trên local**
```bash
yarn install

yarn run docs:dev
```

::: warning
VitePress yêu cầu Node.js phiên bản 18 trở lên
Khuyến khích sử dụng [volta](https://volta.sh/) để quản lý phiên bản Node.js.
:::

5. **Kiểm tra build**
```bash
yarn run docs:build
```

## Thông tin thêm

Xem thêm tại:
- [VitePress](https://vitepress.dev/)
- [GitHub Pages](https://pages.github.com/)
