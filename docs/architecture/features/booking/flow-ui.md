## Tổng quan
Tài liệu mô tả tổng quan về luồng search vé máy bay trên hệ thống Travelist

## Nội dung chính
### Repositories
- Giao diện:
  - https://github.com/apple-world/tvl_travelist.jp
  - https://github.com/apple-world/tvl_nuxt_web2

- Search vé máy bay:
  - https://github.com/apple-world/tvl_api_django
  - https://github.com/apple-world/tvl_gocrawler

### Luồng đặt vé
- Luồng giao diện
```mermaid
sequenceDiagram
    participant User as User
    participant TopPage as TopPage
    participant SearchPage as ListFlightPage

    User->>TopPage: Truy cập top page thông qua https://sand.travelist.work/
    User->>TopPage: Chọn loại vé (`application`): một chiều (`片道`) hoặc khứ hồi (`往復`)
    User->>TopPage: Chọn ngày khởi hành
    User->>TopPage: Chọn điểm đi, điểm đến
    User->>TopPage: Nhấn `国内航空券を検索する`
    TopPage->>SearchPage: Di chuyển tới màn `s/flights/`
    User->>SearchPage: Chọn chuyến bay
```

- Giao diện:
  - Top page (URL: https://sand.travelist.work/):
  ![Top page](./images/top_page_image.png)

  - List flight page (Ví dụ URL: https://sand.travelist.work/s/flights/20250602/20250610/CTS/KIX?mode=flight&room1=1):
  ![List flight page](./images/list_flight_image.png)

### Luồng search vé tương ứng với các repositories

```mermaid
sequenceDiagram
    participant user as User
    participant nuxt2 as tvl_nuxt_web2
    participant travelist.jp as tvl_travelist.jp
    participant gocrawler as tvl_gocrawler
    participant db as Database

    user->>nuxt2: Top page: Chọn các điều kiện vé máy bay (`flight`)
    user->>nuxt2: Tìm kiếm
    nuxt2->>travelist.jp: Điều hướng đến màn `/s/flight`
    travelist.jp ->> gocrawler: Tìm `flight`
    gocrawler ->> db: Query data `flight`
    db ->> gocrawler: Thông tin các `flights`
    gocrawler ->>travelist.jp: List `flight`
    opt crawl `flight`
        par
            gocrawler->>gocrawler: Crawl định kì thông tin `flight` <br>từ trang chủ các hãng `flight` hoặc call API của hệ thống các hãng đó
            gocrawler ->> db: Thêm crawl data vào database
        end
    end
    
    travelist.jp->>user: Hiển thị list flights
```

### Database
- Schema: `airtown.jp`.
- Lưu thông tin các `flight` đã crawl: bảng `domestic_flight_v2_crawlticket`
  - Khi crawl data `flight` định kì, các data mới sẽ tự động được thêm vào bảng này.