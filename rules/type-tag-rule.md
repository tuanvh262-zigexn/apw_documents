# Type Tag Rule

## Mục đích

Chuẩn hoá cách sử dụng `type:` trong tài liệu dự án, giúp các thành viên dễ dàng hiểu, viết, tìm kiếm và bảo trì tài liệu hiệu quả hơn.

---

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
- `Architecture`: Kiến trúc tổng thể, sơ đồ
- `Flow`: Luồng xử lý chính
- `API`: Endpoint liên quan
- `Data`: DB schema liên quan
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

## So sánh nhanh giữa các type:

| Mục                  | `spec`        | `doc`         | `fix`         | `task`        |
|----------------------|---------------|---------------|---------------|---------------|
| Mục tiêu             | Đặc tả chức năng mới | Mô tả kỹ thuật hệ thống | Ghi nhận lỗi và cách sửa | Mô tả công việc cụ thể |
| Bắt đầu khi nào?     | Trước khi dev triển khai | Sau khi chức năng đã tồn tại | Sau khi bug xảy ra | Khi có task được giao |
| Ai là người viết?    | Dev, PM, QA | Dev chính, team lead | Dev phụ trách fix | Dev thực hiện |
| Có cần flow không?   | ✅ Có         | ✅ Có         | ❌ Không cần  | ✅ Có thể có |
| UI/UX                | ✅ nếu có     | Có thể có     | ❌            | ✅ nếu ảnh hưởng |
| API mô tả            | ✅            | ✅            | Có thể có     | ✅ nếu thay đổi |
| Data / DB            | ✅            | ✅            | ✅ nếu có     | ✅ nếu ảnh hưởng |
| Business Rules       | ✅            | Có thể có     | ❌            | Có thể có     |
| Gotchas / Notes      | ❌            | ✅            | ✅            | ✅            |
| Related documents    | ✅            | ✅            | ✅            | ✅            |
