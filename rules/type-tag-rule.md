# 📌 Type Tag Rule – Quy ước sử dụng tag `type:`

Dùng để thống nhất việc sử dụng tag `type` trong tất cả các tài liệu `.md` trong dự án.

Mỗi tag `type` sẽ chỉ rõ loại tài liệu. Các loại tài liệu bao gồm:

## ✅ Quy định cho từng `type:`

### `type:spec`
- **Mục đích:** Đặc tả hành vi của hệ thống hoặc module.
- **Nội dung tối thiểu:**
  - Mô tả tổng quan chức năng
  - Luồng chính (main flow)
  - Trường hợp ngoại lệ
  - Rule nghiệp vụ
  - API liên quan (nếu có)
  - UI, endpoint liên quan (nếu có)

**Ví dụ:** `login__type-spec.md`

---

### `type:doc`
- **Mục đích:** Tài liệu kỹ thuật, giải thích về các giải pháp, hướng dẫn cài đặt hoặc các thông tin kỹ thuật liên quan.
- **Nội dung tối thiểu:**
  - Giải thích thiết kế hệ thống
  - Cấu trúc database / sơ đồ kiến trúc

**Ví dụ:** `login__type-doc.md`

---

### `type:fix`
- **Mục đích:** Ghi nhận bug và cách xử lý.
- **Nội dung:**
  - Mô tả bug: input, output, điều kiện xảy ra
  - Nguyên nhân gốc (root cause)
  - Cách fix & ảnh hưởng liên quan
  - Test case đã verify

**Ví dụ:** `fix-login-issue__type-fix.md`

---

### `type:task`
- **Mục đích:** Mô tả một công việc nhỏ, độc lập (viết tài liệu, viết script, tạo schema...).
- **Nội dung:**
  - Mục tiêu cụ thể
  - Cách thực hiện
  - Kết quả mong muốn

**Ví dụ:** `update-readme-file__type-task.md`

---

