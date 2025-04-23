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

- Allows member to exchange points awarded from TVL app to PayPay wallet.
- Conditions:
  1. Required at least 1 booking during in 1 year
  2. Required have points

## Scope:

- All users who reach the conditions
- Platform: App (iOS & Android)
- ENV: Production & Sand

## Flow:

- The main processing flow will include the following steps:

1. **Step 1.** User accesses the MyPage screen
2. **Step 2.** Log in with a TVL account
3. **Step 3.** User clicks the ポイント交換 (Point Exchange) button
4. **Step 4.** Click the ポイントを交換する - (PayPay) (Exchange Points - PayPay) button
5. **Step 5.** Log in to the PayPay account (If the PayPay app is installed, it will open the app; otherwise, it will open the browser)
6. **Step 6.** Agree to link the PayPay account with the4 TVL account
7. **Step 7.** Linking successful
8. **Step 8.** Return to the TVL app and proceed to exchange points

## Out of Scope:

- Updating...

## References:

- [Sequence Diagrams](./[DOC]_sequence_diagrams.md)
- [Database and ERD diagrams](./[DOC]_table_and_ER_diagram.md)
- [How to deploy](./[DOC]_how_to_deploy.md)
- [How to download the point finance report](./[SPEC]_how_to_download_report.md)
- [How to test funtion exchange points from TVL to Paypay (on Sand)](./[SPEC]_how_to_test.md)
