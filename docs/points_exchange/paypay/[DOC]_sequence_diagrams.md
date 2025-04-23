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

- This document describes the Sequence Diagrams related to the point conversion flow between TVL and PayPay.

## Overview:

## Flow:

- Login with paypay to authenticate user to able to exchange points:

```mermaid
---
config:
  theme: dark
  look: handDrawn
---
sequenceDiagram
    actor User as User
    participant Nuxt2 as Nuxt2
    participant API_Django as API_Django
    participant Postgre as Postgre
    participant Pubsub as Pubsub
    participant PayPay as PayPay
    User ->> Nuxt2: After login paypay successfully, auto redirect to exchange point page
    activate Nuxt2
    Nuxt2 ->> API_Django: POST: mypage/point_input
    activate API_Django
    API_Django ->> Postgre: Create a record with merchantCashbackid: api/v1/paypay/cashback
    activate Postgre
    API_Django ->> Pubsub: Publish
    activate Pubsub
    Pubsub ->> PayPay: POST: If not success, create cashback again
    activate PayPay
    PayPay ->> Pubsub: Return data cashback granting response
    critical webhook
        PayPay ->> API_Django: POST: /api/v1/pavpav/cashback/callback
        API_Django ->> Postgre: Update data matching contents of merchantCashbackld
    end
    deactivate Nuxt2
    deactivate API_Django
    deactivate Pubsub
    deactivate Postgre
    deactivate PayPay
```

- Exchange points from Travelist to Paypay:

```mermaid
---
config:
  theme: dark
  look: handDrawn
---
sequenceDiagram
    actor User as User
    participant Nuxt2 as Nuxt2
    participant API_Django as API_Django
    participant Postgre as Postgre
    participant Pubsub as Pubsub
    participant PayPay as PayPay
    User ->> Nuxt2: After login paypay successfully, auto redirect to exchange point page
    activate Nuxt2
    Nuxt2 ->> API_Django: POST: mypage/point_input
    activate API_Django
    API_Django ->> Postgre: Create a record with merchantCashbackid: api/v1/paypay/cashback
    activate Postgre
    API_Django ->> Pubsub: Publish
    activate Pubsub
    Pubsub ->> PayPay: POST: If not success, create cashback again
    activate PayPay
    PayPay ->> Pubsub: Return data cashback granting response
    critical webhook
        PayPay ->> API_Django: POST: /api/v1/pavpav/cashback/callback
        API_Django ->> Postgre: Update data matching contents of merchantCashbackld
    end
    deactivate Nuxt2
    deactivate API_Django
    deactivate Pubsub
    deactivate Postgre
    deactivate PayPay

```

- Check status cashback granted (run command every 5 minutes)

```mermaid
---
config:
  theme: dark
  look: handDrawn
---
sequenceDiagram
    participant PatchJob as PatchJob
    participant Postgre as Postgre
    participant PayPay as PayPay
    activate PatchJob
    activate Postgre
    activate PayPay
    PatchJob ->> PayPay: Every 5 minutes, check the status using the cashback granted status confirmation API
    PayPay ->> PatchJob: Return cashback granted status confirmation api response
    PatchJob ->> Postgre: Update status
    deactivate PatchJob
    deactivate Postgre
    deactivate PayPay

```

- Revert cashback from paypay to TVL:

- Check status cashback cancellation (run command every 5 minutes)

- Store the transaction history data files in PayPay in s3 and view data

## API: Endpoint liên quan

- Login with paypay to authenticate user to able to exchange points:
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | POST | /mypage/points_exchange |
  | 2 | POST | /api/v1/paypay/sessions |
  | 3 | POST | https://stg-api.sandbox.paypay.ne.jp/v2/cashback |
  | 4 | PUT | api/v1/paypay/update_session |
  | 5 | POST | /api/v1/paypay/sessions/callback |

- Exchange points from Travelist to Paypay:
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | | |
  | 2 | | |
  | 3 | | |
  | 4 | | |
  | 5 | | |

- Check status cashback granted (run command every 5 minutes)
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | | |
  | 2 | | |
  | 3 | | |
  | 4 | | |
  | 5 | | |

- Revert cashback from paypay to TVL:
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | | |
  | 2 | | |
  | 3 | | |
  | 4 | | |
  | 5 | | |

- Check status cashback cancellation (run command every 5 minutes)
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | | |
  | 2 | | |
  | 3 | | |
  | 4 | | |
  | 5 | | |

- Store the transaction history data files in PayPay in s3 and view data
  | No | Method | Enpoint |
  | --- | ------ | ------------------------------------------------ |
  | 1 | | |
  | 2 | | |
  | 3 | | |
  | 4 | | |
  | 5 | | |
