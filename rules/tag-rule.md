# 📌 Tag Rule – Quy ước sử dụng tag cho tài liệu

Dùng để thống nhất việc đánh tag trong tất cả các tài liệu `.md` trong dự án.  
Mỗi tag theo định dạng `key:value`, ví dụ: `type:spec`, `feature:auth/login`.

---

## ✅ Tag: `type:` – Loại tài liệu

| Tag | Ý nghĩa |
|------|--------|
| `type:spec` | Đặc tả chức năng |
| `type:doc` | Tài liệu kỹ thuật |
| `type:fix` | Ghi nhận & xử lý bug |
| `type:task` | Công việc, cập nhật mới |

> 📌 Chi tiết template cho từng loại type: xem trong rules/type-tag-rule.md

---

## ✅ Tag: `feature:` – Nhóm chức năng (có phân cấp)

### 🔐 Nhóm `points_exchange/` – Đăng nhập & xác thực
- `feature:points_exchange/paypay`
- `feature:points_exchange/rakuten`

### 💳 Nhóm `payment/` – Thanh toán
- `feature:payment/paidy`
- `feature:payment/amazon`

> 💡 Khi cần tổng hợp theo nhóm lớn, chỉ cần lọc `feature` bắt đầu bằng tên nhóm ( Ví dụ như `payment/` ).
> 💡 Mỗi nhóm lớn thì sẽ có nhiều nhóm nhỏ bên trong. Ví dụ như `paypay` là nhóm nhỏ trong nhóm lớn `points_exchange`.

---

## ✅ Tag: `domain:` – Vùng kỹ thuật

| Tag | Ý nghĩa |
|------|--------|
| `domain:backend` | Logic và API |
| `domain:frontend` | Giao diện web |
| `domain:mobile` | Ứng dụng di động |
| `domain:infra` | Hạ tầng, CI/CD |
| `domain:shared` | Dùng chung nhiều module |

---

## 📁 Folder Structure Rule – Quy ước thư mục lưu tài liệu

Tài liệu được lưu trong thư mục `docs/`, chia theo nhóm `feature/` chính.
Bên trong mỗi nhóm, sẽ bao gồm các nhóm nhỏ trong có cấu trúc như sau:

📁 docs/ │ ├── points_exchange/ │ ├── paypay/ │ │ └── file1.md │ │ └── file2.md │ ├── rakuten/ │ │ └── file1.md │ │ ├── payment/ │ ├── paidy/ │ ├── amazon/


### 📄 File naming convention (quy tắc đặt tên file):
```bash
<slug-name>__type-<type>.md
```

Ví dụ:

login__type-spec.md

fix-login-retry__type-fix.md

> 🎯 Gợi ý: mỗi folder feature-name/ nên có file README.md để index nhanh các tài liệu bên trong.
> 📌 File index cho cây thư mục được để tại docs/tree-index.json

---

📘 **Hướng dẫn sử dụng**:
- Mỗi file Markdown nên có phần YAML như sau:

```yaml
---
title: "Tài liệu đặc tả tính năng đăng nhập"
tags:
  - type:spec
  - feature:auth/login
  - domain:backend
created_by: "Email của bạn"
created_at: "2025-04-17"
---