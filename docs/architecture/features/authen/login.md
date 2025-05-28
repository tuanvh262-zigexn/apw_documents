# 【Authen】Login
## 1. Mục đích
- Tính năng này nhằm cung cấp một trang đăng nhập có router là `/login` cho phép người dùng sử dụng tài khoản đã đăng kí trước đó để truy cập vào hệ thống.

## 2. Tổng quan chức năng
```mermaid
flowchart TD
    A[Start: Hiển thị trang đăng nhập] --> B[Người dùng nhập email & password]
    B --> C[Xác thực thông tin đăng nhập]
    C -->|Thành công| D[Chuyển đến trang MyPage]
    C -->|Thất bại| E[Hiển thị thông báo lỗi]
    D --> F[Gửi email thông báo đến người dùng]
    E --> B
    F --> G[End]

```

## 3. Nội dung thiết kế

### 3.1. Sơ đồ mô hình dữ liệu
- Dùng dữ liệu bảng members

### 3.2. Sơ đồ luồng xử lý
```mermaid
sequenceDiagram
    participant PageLogin
    participant MyPage
    participant API
    participant DB
    participant SendMailService
    PageLogin->>API: Type email, password and call api api/v2/member/login
    API->>DB: Lấy thông tin member thoả mãn email và password
    DB-->>API: Trả về thông tin member
    API->>SendMailService: Gửi email thông báo trạng thái đăng nhập đến user 
    API-->>PageLogin: Response
    PageLogin->>MyPage: redirect TosequenceDiagram
    participant PageLogin
    participant MyPage
    participant API
    participant DB
    participant SendMailService
    PageLogin->>API: Type email, password and call api api/v2/member/login
    API->>DB: Lấy thông tin member thoả mãn email và password
    alt Đăng nhập thành công
        DB-->>API: Trả về thông tin member
        API->>SendMailService: Gửi email thông báo trạng thái đăng nhập đến user 
        API-->>PageLogin: Response thành công
        PageLogin->>MyPage: redirect To
    else Đăng nhập thất bại
        DB-->>API: Không tìm thấy member
        API-->>PageLogin: Response lỗi
        PageLogin-->>PageLogin: Hiển thị thông báo lỗi
    end
```
