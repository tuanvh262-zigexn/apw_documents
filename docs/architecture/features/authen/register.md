# 【Authen】Register
## 1. Mục đích
- Tính năng này nhằm cung cấp một trang đăng ký cho phép người dùng tạo tài khoản mới trên hệ thống. Trang đăng ký sẽ được truy cập thông qua router `/s/member/register`. Việc đăng ký tài khoản giúp người dùng có thể truy cập các chức năng dành riêng cho thành viên, quản lý thông tin cá nhân, và sử dụng các dịch vụ của hệ thống một cách đầy đủ.

## 2. Tổng quan chức năng
Trang đăng ký sẽ bao gồm một biểu mẫu cho phép người dùng nhập các thông tin cần thiết như: họ tên, địa chỉ email, ngày sinh, giới tính, mật khẩu, và các trường thông tin khác tùy thuộc vào yêu cầu của hệ thống. Sau khi hoàn thành những thông tin cần điền sẽ đến 1 màn hình confirm lại những dữ liệu đã nhập. Cuối cùng khi hoàn tất và gửi biểu mẫu, hệ thống sẽ thực hiện kiểm tra tính hợp lệ của dữ liệu, lưu thông tin người dùng vào cơ sở dữ liệu, và điều hướng người dùng đến trang `s/member/register/complete`.

Các chức năng chính bao gồm:
- Giao diện đăng ký đơn giản, dễ sử dụng.
- Xác thực dữ liệu đầu vào (kiểm tra định dạng email, độ dài mật khẩu, v.v.).
- Kiểm tra trùng lặp tài khoản (email đã tồn tại).
- Hiển thị thông báo lỗi chi tiết khi đăng ký không thành công.
- Tự động đăng nhập và chuyển hướng người dùng đến page complete sau khi đăng ký thành công.
- Send mail thông báo đến user.

## 3. Nội dung thiết kế
<!-- Ghi rõ phương châm thiết kế toàn hệ thống: chức năng sẽ được hiện thực theo cách nào -->
<!-- Nếu có thay đổi kiến trúc hoặc mô hình dữ liệu, đính kèm sơ đồ kiến trúc hoặc ER diagram -->

### 3.1. Kiến trúc tổng thể
```mermaid
flowchart LR
    UI["travelist.jp"]
    API["django"]
    MailService["Send mail service"]
    DB[("postgres")]
    UI --> API
    API --> MailService
    API --> DB
```

### 3.2. Sơ đồ mô hình dữ liệu
```mermaid
erDiagram
    MEMBERS {
        int mem_no PK
        text mem_id
        text mem_pw
        text mem_uim
        int mem_points
        smallint mem_mp
        int med_no
        boolean mem_mag_status
        boolean mem_status
        smallint mem_flg_cd
        text mem_last_name
        text mem_last_name_kana
        text mem_first_name
        text mem_first_name_kana
        text mem_email
        date mem_birthdate
        int mem_age
        smallint mem_sex_cd
        text mem_tel
        text mem_fax
        text mem_zip
        smallint mem_pref_cd
        text mem_address1
        text mem_address2
        text mem_company
        text mem_mileage_no
        timestamp mem_its
        text mem_iua
        inet mem_ira
        text mem_irh
        text mem_receipt_name
        text mem_receipt_mem_name
        int icarus_id
        text amazon_buyer_id
        timestamp mem_dts
        int mem_points_promotion
        int mem_points_purchase
        date mem_points_expire_date
        varchar apple_id
        text ana_mileage_number
        text jal_mileage_number
        int total_price
        int rank_no
        int reset_year
        boolean is_paypay_cashbackable
        int mem_points_wills
        boolean is_point_exchange_enabled
    }

```

### 3.3. Sơ đồ luồng xử lý
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
