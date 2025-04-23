```yaml
 tags:
  - type:spec
  - feature:points_exchange/paypay
  - domain:shared
  - created_by: nhuthq@zigexn.vn
  - created_at: 2025-04-22
----
```

## Objective:

- Allows admin download the finace report

## Scope:

- Admin only
- Platform: PC
- ENV: Sand

## Flow:

- The processing flow will include the following steps:
  **Step 1.** Go to url: https://sand.travelist.work/admin2/ops/finance/point/
  **Step 2.** Login by Admin account
  **Step 3.** Select month and year then press download file excel
  **Step 4.** Open file excel
  **Step 5.** Inside the Sheet 集計

  - Line 7-A: Total number of paypay points used to redeem on the website
  - Line 8-A: Total number of paypay points used to redeem on the App

  **Step 6.** Inside the Sheet 詳細記録

  - Column J: Record the converted Points for Points received from ticket purchases (purchase.exchange_use_points)
  - Column K: Record the converted Points for Points received from new member registration (promotion.exchange_use_points)

## Out of Scope:

- None

## References:

- None
