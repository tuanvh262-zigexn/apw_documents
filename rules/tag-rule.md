# 📘 Tag Rule – Quy ước sử dụng tag cho tài liệu

Quy ước gắn tag cho các tài liệu `.md` trong dự án để thống nhất cách tổ chức, tìm kiếm và phân loại.

---

## 🎯 Mục tiêu

- Chuẩn hóa tagging trong team
- Hỗ trợ tra cứu, tìm kiếm nhanh
- Giúp phân tích phạm vi ảnh hưởng theo loại, chức năng, domain

---

## ✅ Cấu trúc tag

Mỗi tag có dạng `key:value`, ví dụ:

- `type:spec`
- `feature:payment/amazon`
- `domain:frontend`

---

## ✅ Tag `type:` – Loại tài liệu

| Tag         | Ý nghĩa                     |
|-------------|-----------------------------|
| `type:spec` | Tài liệu đặc tả chức năng   |
| `type:doc`  | Tài liệu kỹ thuật           |
| `type:fix`  | Ghi chú bug / fix bug       |
| `type:task` | Mô tả task hoặc thay đổi    |

> 📌 Chi tiết định dạng từng `type:` được mô tả trong bên dưới

## Danh sách các `type:` hiện tại

### 1. `type:spec` – Đặc tả chức năng (Specification)

Dùng để mô tả **chức năng mới cần phát triển**, dành cho dev & QA triển khai.

#### Cấu trúc bắt buộc:

- `Objective`: Mục tiêu chức năng
- `Scope`: Phạm vi áp dụng
- `Flow`: Luồng xử lý chính
- `Out of Scope`: Những phần không thuộc phạm vi xử lý
- `References`: Tài liệu liên quan

---

### 2. `type:doc` – Tài liệu kỹ thuật (Technical Documentation)

Dùng để mô tả **hệ thống hiện tại đang hoạt động như thế nào**.

#### Cấu trúc bắt buộc:

- `Purpose`: Tài liệu này để làm gì?
- `Overview`: Tổng quan module hoặc hệ thống
- `Flow`: Luồng xử lý chính ( Phải viết bằng mermaid sequence diagram )
- `API`: Endpoint liên quan

Ví dụ:
### POST /api/v1/payments

- **Description**: Tạo mới một giao dịch thanh toán
- **Auth**: Required (Bearer Token)
- **Request Body**:
```json
{
  "amount": 1000,
  "method": "paypay"
}
```
- **Response**:
```json
{
  "id": 101,
  "status": "pending"
}
```

- `Data`: DB schema liên quan

Ví dụ:
#### 📦 Table: `payment_transactions`

| Column Name     | Type        | Description                          |
|------------------|-------------|--------------------------------------|
| `id`             | `BIGINT`    | Khóa chính                           |
| `user_id`        | `BIGINT`    | Id người dùng                        |
| `amount`         | `DECIMAL`   | Số tiền giao dịch                    |
| `status`         | `VARCHAR`   | Trạng thái (pending, success, fail) |
| `created_at`     | `TIMESTAMP` | Ngày tạo                             |
- `Config / Env`: Cấu hình đặc biệt
- `Gotchas / Notes`: Điều cần lưu ý khi maintain
- `Related`: Tài liệu liên quan

---

### 3. `type:fix` – Ghi nhận bug / sự cố

Dùng để ghi lại **bug đã xảy ra, nguyên nhân và cách xử lý**.

#### Cấu trúc bắt buộc:

- `Summary`: Tóm tắt lỗi
- `Root Cause`: Nguyên nhân gốc
- `Impact`: Mức độ ảnh hưởng
- `Investigation`: Cách tìm ra bug
- `Fix Plan`: Cách sửa cụ thể
- `Deployment Notes`: Triển khai, rollback, migration?
- `Lesson Learned`: Bài học rút ra
- `Related`: Link PR, ticket, tài liệu khác

---

### 4. `type:task` – Tác vụ kỹ thuật, cải tiến, update nhỏ

Dùng cho những công việc nhỏ không cần đặc tả đầy đủ như spec.

#### Cấu trúc bắt buộc:

- `Objective`: Mục tiêu task
- `Background`: Bối cảnh task
- `Scope`: Phạm vi thực hiện
- `Steps`: Các bước thực hiện
- `Impact`: Ảnh hưởng tới logic, API, UI?
- `Notes`: Điều cần lưu ý
- `Related`: Link tới issue, spec, PR,…

---

## ✅ Tag `feature:` – Nhóm chức năng (phân cấp được)

Tag `feature:` đại diện cho nhóm tính năng, hỗ trợ phân cấp theo cấu trúc `feature:<main>/<sub>/<...>`.

Ví dụ:

- `feature:points_exchange/paypay`
- `feature:user_management/login_flow`
- `feature:points_exchange/paypay/session`

### ⛓ Một file có thể gắn nhiều `feature:`?

✅ **Có.** Nếu tài liệu mô tả một luồng hoặc chức năng liên quan nhiều feature, có thể gắn nhiều tag `feature:` để phản ánh phạm vi ảnh hưởng.

---

### 📂 Gợi ý tổ chức file

| Trường hợp                                | Gợi ý                                                                 |
|-------------------------------------------|-----------------------------------------------------------------------|
| Tài liệu ngắn, mô tả luồng chung          | Gắn nhiều `feature:` trong 1 file                                     |
| Tài liệu dài, mỗi phần có logic riêng     | Tách theo từng `feature:`                                            |
| Luồng liên quan nhiều feature phức tạp    | Tạo file tổng hợp `integration spec` trong thư mục `shared/` hoặc `flows/` |

---

## ✅ Tag `domain:` – Vùng kỹ thuật

| Tag              | Ý nghĩa                          |
|------------------|----------------------------------|
| `domain:backend` | Xử lý logic, API                |
| `domain:frontend`| Giao diện web                   |
| `domain:mobile`  | Mobile app                      |
| `domain:infra`   | Hạ tầng, CI/CD, config          |
| `domain:shared`  | Dùng chung nhiều module/domain  |

---

## 🧪 Ví dụ gắn tag cho một file

```yaml
tags:
  - type:spec
  - feature:user_management/login_flow
  - feature:points_exchange/paypay/session
