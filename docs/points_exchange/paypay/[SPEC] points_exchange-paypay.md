```yaml
 tags:
  - type:spec
  - feature:points_exchange/paypay
  - domain:shared
  - created_by: nhuthq@zigexn.vn
  - created_at: 2025-04-22
----
```

## Overview

- Conditions:
  1. Required at least 1 booking during in 1 year
  2. Required have points
- Allows member to exchange points awarded from tvl app to paypay wallet.

## Structure (integrate with paypay)

### Login with paypay to authenticate user to able to exchange points

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

### Exchange points from Travelist to Paypay

- https://www.mermaidchart.com/raw/7deaec01-c839-44b1-83cb-e6a6aca06a8d?theme=dark&version=v0.1&format=svg

### Check status cashback granted (run command every 5 minutes)

- https://www.mermaidchart.com/raw/8ea12b1c-d049-4453-8c6f-34f569faee1e?theme=dark&version=v0.1&format=svg

### Revert cashback from paypay to TVL

### Check status cashback cancellation (run command every 5 minutes)

### Store the transaction history data files in PayPay in s3 and view data

## Database and ERD diagram

### Table `paypay_sessions`

### Table `paypay_cashback_request`

### Table `paypay_reverse_cashback_request`

### Table `paypay_transaction_file_logs`

## ECS on Aws

- Cluster `sand-cluster01` :

  - Service: [sand-kokunai-django-give-cashback-worker](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/sand-cluster01/services/sand-kokunai-django-give-cashback-worker/health?region=ap-northeast-1)
  - **Scheduled tasks:** [sand_check_status_paypay_cashback](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/sand-cluster01/scheduled-tasks/sand_check_status_paypay_cashback?region=ap-northeast-1)

- Cluster **`prod-cluster01` :**
  - Service: [prod-kokunai-django-give-cashback-worker](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prod-cluster01/services/prod-kokunai-django-give-cashback-worker/health?region=ap-northeast-1)
  - **Scheduled tasks:** [prod_check_status_paypay_cashback](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prod-cluster01/scheduled-tasks/prod_check_status_paypay_cashback?region=ap-northeast-1)

<aside>
📒 *** Provide a detailed description of the functionality ***
- {sand/prod}-kokunai-django-give-cashback-worker: Use Pub/Sub to handle the API call for converting points from TVL to PayPay (The job will be refresh and run again every 00:00 every day).
- {sand/prod}-check_status_paypay_cashback: check status detail casback when callback doesn't work(run every 5 minutes)
</aside>

## How To Deploy

- Deploy api_django
- Refresh worker {sand/prod}-kokunai-django-give-cashback-worker
- Refresh worker {sand/prod}-check_status_paypay_cashback

## Download Finance Point Report

(Ex: [ポイントデータ\_20240108174016.xls](https://github.com/apple-world/tvl_api_django/files/13857892/_20240108174016.xls))

- Go to url: https://sand.travelist.work/admin2/ops/finance/point/
- Select month and year then press download file excel
- Open file excel
  Sheet 集計
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/80de0987-1650-45d8-a799-5271efa18b1c/Untitled.png)
  Line 7-A: Total number of paypay points used to redeem on the website
  Line 8-A: Total number of paypay points used to redeem on the App
  Sheet 詳細記録
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/37a364f6-e441-41b4-887e-0d02f7745704/Untitled.png)
  Column J: Record the converted Points for Points received from ticket purchases (purchase.exchange_use_points)
  Column K: Record the converted Points for Points received from new member registration (promotion.exchange_use_points)

## How To Test Exchange Points From TVL to Paypay - Sand

### Create PayPay Account:

- Go to link: https://developer.paypay.ne.jp/account/signin
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/419a3b80-c8c2-4e83-8c9a-8f27b7177934/Untitled.png)
- Register an account and then log in
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/6f2a3e48-ef1b-44e5-93b0-251209663435/Untitled.png)
- Setting webhook and callback: https://developer.paypay.ne.jp/settings
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/f5f7c0d6-1909-4616-9c92-db0ee1d0d153/Untitled.png)

### Step 1: [\*Go to my page](https://sand.travelist.work/mypage/) and\* [click](https://sand.travelist.work/mypage/points_exchange/menu) ポイント交換

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/02961207-9154-49c0-b7c7-31816a7777e4/Untitled.png)

### Step 2: Click section PayPay ポイント

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/ec691114-3a2b-40fe-aefa-22e3dbca23cc/Untitled.png)

**_Note: Point conversion rate_**

- PC and SP: 100pt → 50 pt.
- APP Native: 100pt → 100pt

### Step 3: Login to PayPay

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/3242170f-8cbb-4867-b26d-d0d963583e7d/Untitled.png)

**_Note: Check Type Of Device:_**

- Account: `080-7862-6960`
- Password: `wC6Pj9Bohx`

**_Note: Check Type Of Device:_**
After click section `PayPay ポイント, automatically open link to login paypay`.

- PC: Redirect page login paypay on PC’s brower
- SP: Open app paypay to login on smartphone
- APP: Open app paypay to login on smartphone

### Step 4: After login paypay, automatically redirect to the page (**[points_exchange/menu](https://sand.travelist.work/mypage/points_exchange/menu)**) and callback api (/api/v1/paypay/sessions/update_session)

- ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/6084ff31-b8ab-42df-94ff-49070fc00df2/Untitled.png)

### Step 5: After loading the icon, automatically redirect to the page ([point_input](https://sand.travelist.work/mypage/point_input)) to exchange point

- ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cba06f59-0453-47d4-bb2f-f095cd76f94e/9afc7c88-3f6b-4740-9b9c-7faaa17469e5/Untitled.png)

Enter the number of points from the keyboard or select +100 or + 500 points or 1000 points or 5000 points to exchange
