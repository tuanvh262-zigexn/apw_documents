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

- This document describes how to test the Exchange Points from TVL to PayPay on Sand ENV.

## Scope:

- User
- Platform: App
- ENV: Sand

## Flow:

**Step 1.** Go to MyPage and click ポイント交換
**Step 2.** Click section PayPay ポイント
**Step 3.** Login to paypay

### Note: Account to test

- Account: `080-7862-6960`
- Password: `wC6Pj9Bohx`

### Note: Check type of devices: After c*lick section `PayPay ポイント, automatically open link to login paypay`.*

- PC: Redirect page login paypay on PC’s brower
- SP: Open app paypay to login on smartphone
- APP: Open app paypay to login on smartphone

### **Step 4: After login paypay, automatically redirect to the page (**[points_exchange/menu](https://sand.travelist.work/mypage/points_exchange/menu)**) and callback api (/api/v1/paypay/sessions/update_session)**

Step 5: After loading the icon, automatically redirect to the page (point_input) to exchange point

Enter the number of points from the keyboard or select +100 or + 500 points or 1000 points or 5000 points to exchange

## Out of Scope:

- None

## References:

- None
