---
title: レポート機能のシステム設計
---

# dx-kpieeのレポート機能設計

このドキュメントでは、dx-kpieeにおけるレポート機能の設計と主要コンポーネントについて説明します。

## 1. 概要

dx-kpieeのレポート機能は、データの視覚化と分析を提供する中核機能です。フロントエンド（Vue.js）とバックエンド（Go API）から構成され、高性能なデータ処理と直感的なユーザーインターフェースを実現しています。

## 2. システムアーキテクチャ

レポート機能のシステムアーキテクチャは以下の通りです：

```mermaid
flowchart TB
    subgraph "フロントエンド (Vue.js)"
        ReportList["レポート一覧画面"]
        ReportDetail["レポート詳細画面"]
        ReportSettings["レポート設定"]
        ReportExport["レポートエクスポート"]
    end
    
    subgraph "バックエンド"
        RailsAPI["Rails API\n(レポート管理)"]
        GoAPI["Go API\n(高速データ集計)"]
        BatchProcess["バッチ処理\n(事前集計)"]
    end
    
    subgraph "データストア"
        TiDB[(TiDB)]
        Cache[(キャッシュ)]
    end
    
    User(("ユーザー"))
    ExternalSystems["外部システム\n(スプレッドシートなど)"]
    
    User --> ReportList
    User --> ReportDetail
    ReportList --> RailsAPI
    ReportDetail --> GoAPI
    ReportSettings --> RailsAPI
    ReportExport --> GoAPI
    ReportExport --> ExternalSystems
    
    RailsAPI --> TiDB
    GoAPI --> TiDB
    GoAPI --> Cache
    BatchProcess --> TiDB
```

## 3. 主要コンポーネント

### 3.1 フロントエンドコンポーネント

#### レポート一覧画面
- 利用可能なレポートの一覧表示
- 検索・フィルタリング機能
- ソート機能
- ページネーション

#### レポート詳細画面
- テーブル形式でのデータ表示
- 表示設定の切り替え
- 期間表記の変更
- ドリルダウン機能
- カラム幅の調整
- 数値が入っていない行の非表示設定

#### レポート設定
- 表示形式の設定
- カスタムカラーの設定
- レポート全体へのメモ機能

#### レポートエクスポート
- CSVエクスポート
- スプレッドシートエクスポート

### 3.2 バックエンドコンポーネント

#### Rails API
- レポート管理（作成・更新・削除）
- ユーザー設定の管理
- データアクセス制御

#### Go API
- 高速データ集計処理
- 大量データの効率的な処理
- SQLクエリの最適化（NULL値のCOALESCE処理など）

#### バッチ処理
- 事前集計処理
- データキャッシュの更新
- 定期的なレポート生成

## 4. データモデル

レポート機能の主要なデータモデルは以下の通りです：

```mermaid
erDiagram
    REPORT {
        string id PK
        string name
        string description
        date created_at
        date updated_at
        string category
        json settings
    }
    REPORT_DATA {
        string id PK
        string report_id FK
        string period
        json header_data
        json row_data
    }
    REPORT_SETTINGS {
        string id PK
        string report_id FK
        string user_id FK
        json display_settings
        json column_settings
    }
    USER {
        string id PK
        string name
    }
    REPORT ||--o{ REPORT_DATA : contains
    REPORT ||--o{ REPORT_SETTINGS : has
    USER ||--o{ REPORT_SETTINGS : configures
```

## 5. 処理フロー

### 5.1 レポートデータ取得フロー

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant Frontend as フロントエンド
    participant GoAPI as Go API
    participant Cache as キャッシュ
    participant TiDB as データベース
    
    User->>Frontend: レポート詳細画面を開く
    Frontend->>GoAPI: レポートデータリクエスト
    GoAPI->>Cache: キャッシュ確認
    
    alt キャッシュあり
        Cache-->>GoAPI: キャッシュデータ
    else キャッシュなし
        GoAPI->>TiDB: データ取得クエリ
        TiDB-->>GoAPI: 生データ
        GoAPI->>GoAPI: データ集計処理
        GoAPI->>Cache: 結果をキャッシュ
    end
    
    GoAPI-->>Frontend: レポートデータ応答
    Frontend->>Frontend: データ表示処理
    Frontend-->>User: レポート表示
    
    User->>Frontend: 表示設定変更
    Frontend->>Frontend: 表示データ再構築
    Frontend-->>User: 更新されたレポート表示
```

### 5.2 バッチ処理フロー

```mermaid
flowchart LR
    Schedule["スケジューラ"] --> Batch["バッチ処理"]
    Batch --> Extract["データ抽出"]
    Extract --> Transform["データ変換・集計"]
    Transform --> Load["事前集計データ保存"]
    Load --> Cache["キャッシュ更新"]
    Load --> Notify["完了通知"]
```

## 6. 技術詳細

### 6.1 フロントエンド実装

- Vue.js + TypeScriptを使用したコンポーネントベースの実装
- 自動生成されたAPIクライアントを使用したバックエンドとの連携
- コンポーネントはStorybookでテスト可能

### 6.2 バックエンド実装

- Goによる高性能なデータ処理
  - スキーマファーストアプローチによるAPI設計
  - OpenAPI/Swaggerを使用した自動コード生成
  - NULL値をCOALESCEでゼロに変換する集計関数の実装

- Railsによるデータ管理
  - コードファーストアプローチによるAPI設計
  - rswagを使用したOpenAPI/Swaggerドキュメント自動生成

### 6.3 データ処理の最適化

- TiDBを活用した高速クエリ処理
- キャッシュ戦略によるレスポンス時間の短縮
- バッチ処理による事前集計

## 7. 将来の拡張性

- AI分析機能の統合
- より高度な可視化オプションの追加
- カスタムレポートビルダーの実装
- モバイルアプリとの連携強化
