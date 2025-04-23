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

- This document describes how to setup the infra and deploy the feature.

## Overview:

- This document included 3 parts:

1. Setup PayPay dashboard
2. Setup ECS On Aws
3. How to deploy

## Flow:

### Setup PayPay dashboard:

**Step 1.** Go to link: https://developer.paypay.ne.jp/account/signin
**Step 2.** Register an account and then log in
**Step 3.** Setting webhook and callback: https://developer.paypay.ne.jp/settings

### ECS on Aws:

- Cluster `sand-cluster01` :

  - Service: [sand-kokunai-django-give-cashback-worker](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/sand-cluster01/services/sand-kokunai-django-give-cashback-worker/health?region=ap-northeast-1)
  - **Scheduled tasks:** [sand_check_status_paypay_cashback](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/sand-cluster01/scheduled-tasks/sand_check_status_paypay_cashback?region=ap-northeast-1)

- Cluster **`prod-cluster01` :**

  - Service: [prod-kokunai-django-give-cashback-worker](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prod-cluster01/services/prod-kokunai-django-give-cashback-worker/health?region=ap-northeast-1)
  - **Scheduled tasks:** [prod_check_status_paypay_cashback](https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prod-cluster01/scheduled-tasks/prod_check_status_paypay_cashback?region=ap-northeast-1)

- Provide a detailed description of the functionality
  - {sand/prod}-kokunai-django-give-cashback-worker: Use Pub/Sub to handle the API call for converting points from TVL to PayPay (The job will be refresh and run again every 00:00 every day).
  - {sand/prod}-check_status_paypay_cashback: check status detail casback when callback doesn't work(run every 5 minutes)

### How to deploy

- Deploy api_django
- Refresh worker {sand/prod}-kokunai-django-give-cashback-worker
- Refresh worker {sand/prod}-check_status_paypay_cashback

## API

- None
