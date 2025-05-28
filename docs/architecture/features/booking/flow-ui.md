## Tổng quan
Tài liệu mô tả tổng quan về luồng search vé máy bay trên hệ thống Travelist

## Nội dung chính
### Repositories
- Giao diện:
  - https://github.com/apple-world/tvl_travelist.jp
  - https://github.com/apple-world/tvl_nuxt_web2

- Search vé máy bay:
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

### API search vé
- Endpoint: 
  - https://sand.travelist.work/api/v1/search/flights/{departure_date}/{hãng bay}/{departure_airport}/{arrival_airport}
    - `departure_date`: Ngày khởi hành
    - `departure_airport`: điểm sân bay xuất phát
    - `arrival_airport`: điểm sân bay kết thúc
- Example: https://sand.travelist.work/api/v1/search/flights/20250602/ANA/CTS/KIX
- Code reference: [flight_search.go](https://github.com/apple-world/tvl_gocrawler/blob/163cbe7337582b0ca8d439d92b7c41596d1bb41b/handler/flight_search.go#L20-L168)

### Meta search
- Ngoài cách tìm kiếm vé trực tiếp trên hệ thống `Travelist`, các chuyến bay còn có thể được tìm kiếm thông qua các trang khác (`Skyscanner`, `Idou`, `Travelko`), được gọi là `meta search`. 
- Các bên thứ ba này sẽ gọi API meta search của hệ thống `Travelist` để lấy thông tin các chuyến bay và hiển thị.
- Các APIs search vé của bên `Travelist` cung cấp cho các bên thứ ba:

| Bên thứ ba | API Endpoint | Code Reference |
|----------|-------------|----------------|
| Skyscanner | https://sand.travelist.work/api/v1/search/flights_travelko/{depDate}/{airline}/{depAir}/{arrAir}/{travellerCnt}/{childCnt}/{infantCnt} | https://github.com/apple-world/tvl_gocrawler/blob/ec583f10aa446d5e6be2572100c33109d0538df5/handler/scanner_search.go#L28-L263 |
| Idou | https://sand.travelist.work/api/v1/search/flights_kakuyasuidou/{depDate}/{airline}/{depAir}/{arrAir}/{travellerCnt}/{childCnt}/{infantCnt} | https://github.com/apple-world/tvl_gocrawler/blob/df832b8df14bc06938dfa2e267e9ba7a066b68df/handler/kakuyasuidou_search.go#L23-L157|
| Travelko | https://sand.travelist.work/api/v1/search/flights_travelko/{depDate}/{airline}/{depAir}/{arrAir}/{travellerCnt}/{childCnt}/{infantCnt} | https://github.com/apple-world/tvl_gocrawler/blob/b36c89ee89a7a9e627fe9cd381e80decad75c98c/handler/travelko_search.go#L24-L176|
- Trong đó:
  - `depDate`: ngày khởi hành
  - `airline`: hãng bay
  - `depAir`: sân bay khởi hành
  - `arrAir`: sân bay điểm đến
  - `travellerCnt`, `childCnt`, `infantCnt`: Lần lượt là số hành khách là người lớn, trẻ em, trẻ sơ sinh
