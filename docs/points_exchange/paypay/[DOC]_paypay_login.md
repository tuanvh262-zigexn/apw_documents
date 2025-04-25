```yaml
 Tiêu đề: Tài liệu kỹ thuật về luồng đăng nhập qua PayPay
 Mô tả: Tài liệu này trình bày chi tiết luồng xử lý đăng nhập vào tài khoản PayPay nhằm phục vụ việc liên kết tài khoản TVL và PayPay thông qua ứng dụng PayPay hoặc trình duyệt. Đồng thời mô tả cách bật Developer Mode để phục vụ môi trường kiểm thử.

 tags:
  - type:doc
  - feature:points_exchange/paypay/login
  - domain:shared
  - created_by: nhuthq@zigexn.vn
  - created_at: 2025-04-25
----
```

## Purpose:

- Tài liệu này nhằm mục đích cung cấp mô tả kỹ thuật chi tiết liên quan đến quá trình đăng nhập tài khoản PayPay – một bước trung gian quan trọng trong quá trình liên kết tài khoản giữa TVL App và PayPay, từ đó cho phép người dùng thực hiện tính năng chuyển đổi điểm.

## Overview:

- Việc đăng nhập PayPay là bước trung gian quan trọng trước khi người dùng có thể thực hiện chuyển đổi điểm từ TVL sang ví PayPay, và đảm bảo rằng các tài khoản được liên kết một cách an toàn và hợp lệ.
- Tên chức năng: Đăng nhập tài khoản PayPay (Login with PayPay)
- Mục tiêu:
  - Cho phép người dùng đăng nhập vào tài khoản PayPay của họ để thực hiện liên kết với tài khoản TVL.
  - Hỗ trợ chế độ phát triển (Developer Mode) dành cho môi trường kiểm thử.
- Điều kiện:
  - Người dùng phải có tài khoản PayPay đã được tạo sẵn từ trước.
- Nền tảng:
  - Ứng dụng TVL (iOS, Android)
  - Ứng dụng PayPay (iOS, Android)
  - Trình duyệt Web (trong trường hợp không cài PayPay App)

## Flow:

```mermaid
sequenceDiagram
    autonumber
    participant User as Người dùng
    participant TVLApp as Ứng dụng TVL
    participant PayPayApp as Ứng dụng PayPay (mobile)
    participant Browser as Trình duyệt (web)
    participant PayPayLogin as PayPay Login
    participant Consent as Màn hình chấp thuận
    participant TVLServer as TVL Server

    User->>TVLApp: 1. Ấn nút "Đổi điểm PayPay" (MyPage)

    alt PayPayApp Installed
        TVLApp-->>PayPayApp: 2. Mở PayPay App vào trang đăng nhập
    else Không cài PayPay App
        TVLApp-->>Browser: 2. Mở trình duyệt đến trang đăng nhập PayPay
    end

    opt Bật chế độ Phát Triển (Dev Mode)
        PayPayApp->>PayPayApp: 3. Ấn logo PayPay 7 lần (Dev Mode)
        PayPayApp->>PayPayLogin: 3. Chọn "Log in with PayPay for Developers account"
        Browser->>Browser: Truy cập URL: https://stg-www.sandbox.paypay.ne.jp/
    end

    PayPayLogin->>User: 4. Yêu cầu nhập Phone/Password
    User->>PayPayLogin: Nhập Phone/Password
    PayPayLogin-->>Consent: 5. Đăng nhập thành công → Chuyển tới màn hình chấp thuận liên kết

    Consent-->>PayPayLogin: 6. Người dùng chấp thuận liên kết
    PayPayLogin-->>TVLServer: 7. Gửi callback với Authorization Code

    TVLServer->>TVLServer: 8. Gọi PayPay token API để lấy thông tin user
    TVLServer->>TVLServer: 9. Lưu thông tin người dùng PayPay vào bảng `session` để đánh dấu trạng thái đã đăng nhập
    TVLServer-->>TVLApp: 10. Trả về kết quả xác thực thành công
    TVLApp-->>User: 11. Chuyển sang màn hình xác nhận đổi điểm
```

- TVLServer giờ đóng vai trò:
  - Nhận callback từ PayPay chứa authorization code.
  - Gọi PayPay token API để đổi lấy access token và thông tin người dùng.
  - Lưu thông tin vào bảng Session để đánh dấu trạng thái login.
  - Trả kết quả về lại frontend.

## API:

| Endpoint               | Method | Description                                                |
| ---------------------- | ------ | ---------------------------------------------------------- |
| `/paypay/authorize`    | GET    | Khởi tạo luồng đăng nhập PayPay, redirect đến URL xác thực |
| `/paypay/callback`     | POST   | Nhận callback từ PayPay sau khi người dùng xác thực        |
| `/paypay/token`        | POST   | Đổi authorization code lấy access token từ PayPay          |
| `/paypay/link-account` | POST   | Lưu thông tin tài khoản PayPay vào bảng Session của TVL    |

- **Lưu ý:** Trong luồng đăng nhập PayPay, không có API từ phía TVL trực tiếp xử lý việc login, vì tất cả việc xác thực đều thực hiện trên nền tảng PayPay. Tuy nhiên, một số thông tin kỹ thuật liên quan có thể được sử dụng từ tài liệu chính thức của PayPay:
  | Thông tin | Mô tả |
  |----------------------------|----------------------------------------------------------------------|
  | **URL môi trường Production** | `https://www.paypay.ne.jp/opa/authorize` |
  | **URL môi trường Sandbox** | `https://stg-www.sandbox.paypay.ne.jp/` |
  | **Tài liệu chính thức** | [PayPay Official Docs](https://www.paypay.ne.jp/opa/doc/v1.0/account_link.html#section/Acquire-user-authorization) |
  | **OAuth Flow** | Authorization Code Grant |

- Developer Mode:
  | Nền tảng | Cách bật chế độ |
  |---------------------|----------------------------------------------------------------------------------|
  | **Ứng dụng PayPay** | Ấn 7 lần vào logo PayPay ở góc trái màn hình đăng nhập. Chọn `Log in with PayPay for Developers account`. |
  | **Trình duyệt Web** | Truy cập vào liên kết: `https://stg-www.sandbox.paypay.ne.jp/` |
