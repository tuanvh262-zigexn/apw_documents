```yaml
 tags:
  - type:doc
  - feature:points_exchange/paypay
  - domain:shared
  - created_by: nhuthq@zigexn.vn
  - created_at: 2025-04-23
----
```

## Purpose:

- This document describes the Tables and AR diagrams related to the point conversion flow between TVL and PayPay.

## Overview

## Flow:

- Table `paypay_sessions`
  | Field Name | Data Type |
  |----------------------|---------------|
  | id | bigserial |
  | notification*type | varchar(255) |
  | notification_id | varchar(50) |
  | nonce | varchar(8) |
  | userAuthorizationId | varchar(64) |
  | expiry | int4 |
  | result | varchar(10) |
  | reason | varchar(255) |
  | code | varchar(50) |
  | codeId | varchar(50) |
  | mesage *(typo)\_ | varchar(255) |

- Table: `paypay_cashback_request`
  | Field Name | Data Type |
  | ------------------- | ------------ |
  | id | bigserial |
  | merchanceCashbackId | varchar(64) |
  | userAuthorizationId | varchar(64) |
  | amount | int4 |
  | requestedAt | int4 |
  | walletType | varchar(20) |
  | status | varchar(15) |
  | acceptedAt | int4 |
  | cashbackId | varchar(64) |
  | code | varchar(50) |
  | codeId | varchar(50) |
  | mesage _(typo)_ | varchar(255) |
  | created_at | timestamptz |
  | member_no | int4 |
  | app_type | varchar(2) |

  ```mermaid
  erDiagram
    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"

  ```

- Table `paypay_reverse_cashback_request`
  Updating...

- Table `paypay_transaction_file_logs`
  Updating...

## API:

- None
