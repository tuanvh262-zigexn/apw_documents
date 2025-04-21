# 📘 Tag Rule – Quy ước sử dụng tag cho tài liệu

Quy ước gắn tag cho các tài liệu `.md` trong dự án để thống nhất cách tổ chức, tìm kiếm và phân loại.

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

> 📌 Chi tiết định dạng từng `type:` được mô tả trong file [`rules/type-tag-rule.md`](https://github.com/tuanvh262-zigexn/apw_documents/blob/main/rules/type-tag-rule.md).

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

## 🎯 Mục tiêu

- Chuẩn hóa tagging trong team
- Hỗ trợ tra cứu, tìm kiếm nhanh
- Giúp phân tích phạm vi ảnh hưởng theo loại, chức năng, domain

---

## 🧪 Ví dụ gắn tag cho một file

```yaml
tags:
  - type:spec
  - feature:user_management/login_flow
  - feature:points_exchange/paypay/session
