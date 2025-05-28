# 【Authen】Register
## 1. Mục đích
- Tính năng này nhằm cung cấp một trang đăng ký cho phép người dùng tạo tài khoản mới trên hệ thống. Trang đăng ký sẽ được truy cập thông qua router `/s/member/register`. Việc đăng ký tài khoản giúp người dùng có thể truy cập các chức năng dành riêng cho thành viên, quản lý thông tin cá nhân, và sử dụng các dịch vụ của hệ thống một cách đầy đủ.

## 2. Tổng quan chức năng
```mermaid
flowchart TD
    Start([Bắt đầu]) --> Form[Trang đăng ký<br/>Biểu mẫu nhập thông tin]
    
    Form --> InputInfo[Người dùng nhập:<br/>- Họ tên<br/>- Email<br/>- Ngày sinh<br/>- Giới tính<br/>- Mật khẩu<br/>- Thông tin khác]
    
    InputInfo --> Confirm[Màn hình xác nhận<br/>Hiển thị lại dữ liệu đã nhập]
    
    Confirm --> Review{Người dùng<br/>kiểm tra lại?}
    
    Review -->|Chỉnh sửa| Form
    Review -->|Xác nhận| Submit[Gửi biểu mẫu]
    
    Submit --> Validate{Kiểm tra<br/>tính hợp lệ<br/>của dữ liệu?}
    
    Validate -->|Không hợp lệ| Error[Hiển thị lỗi<br/>Quay lại form]
    Error --> Form
    
    Validate -->|Hợp lệ| SaveDB[(Lưu thông tin<br/>vào CSDL)]
    
    SaveDB --> Success[Điều hướng đến<br/>s/member/register/complete]
    
    Success --> End([Kết thúc])

```

## 3. Nội dung thiết kế

### 3.1. Sơ đồ mô hình dữ liệu
- Bảng member trong schema airtown.jp

### 3.2. Sơ đồ luồng xử lý
```mermaid
sequenceDiagram
    participant PageRegister
    participant PageConfirm
    participant PageComplete
    participant API
    participant DB
    participant SendMailService
    PageRegister->>PageConfirm: Type member infomation
    PageConfirm->>API: Click button "登録する" and call api /api/v2/member/register
    API->>DB: Save member infomation
    API->>SendMailService: Send mail notion to user
    API-->>PageConfirm: Response
    PageConfirm->>API: call api login
    API-->>PageConfirm: Response
    PageConfirm->>PageComplete: redirect to
```
