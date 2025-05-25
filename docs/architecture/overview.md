# Tổng quan kiến trúc hệ thống

ABC

## Toàn cảnh hệ thống

Về microservice

```mermaid
flowchart TB
    subgraph "apw"
        subgraph "System for enduser"
            FrontWebUI["FEWeb"]
            Apw_API["APIサ"]
            DB[(PostgreSQL)]
        end
        
        subgraph "System for admin"
            AdminWebUI["Admin website"]
            
            subgraph "Backend"
                PHP["PHP 5.2"]
            end
        end
        
        User[("User")]

        User --> FrontWebUI
        FrontWebUI --> Apw_API
        Apw_API --> DB

        User --> AdminWebUI
    end
```

## Tổng quan chức năng dịch vụ

### tvl_travelist.jp

Cung cấp các chức năng chính sau:

- **Giao diện quản trị web**: Giao diện dành cho người dùng

## Công nghệ sử dụng

| Hạng mục | Công nghệ | Phiên bản |
|-----|------|----------|
| Frontend Framework | VueJS | xxxx |

### tvl_apl.travelonline.co.jp

Cung cấp các chức năng chính sau:

- **Giao diện quản trị web**: Giao diện dành cho người quản trị viên

## Công nghệ sử dụng

| Hạng mục | Công nghệ | Phiên bản |
|-----|------|----------|
| Backend | PHP | 5.2 |

