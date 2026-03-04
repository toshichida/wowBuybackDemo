# リポジトリ構造定義書

| 項目 | 内容 |
|------|------|
| 参照元 | technical-specification.md、functional-design.md |
| 最終更新日 | 2026-03-04 |
| 版数 | 1.0 |
| スコープ | MVP（顧客向けモックアップ） |

---

## 1. MVP用ディレクトリ構成

```
wowBuybackDemo/
├── docs/                          # 永続的ドキュメント
│   ├── product-requirements.md
│   ├── ubiquitous-language.md
│   ├── functional-design.md
│   ├── technical-specification.md
│   ├── repository-structure.md
│   └── development-guidelines.md
│
├── src/
│   ├── buyback-ticket/            # 買取票ページ
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx (or page.tsx)
│   │
│   ├── consent-form/              # 買取同意書フォーム
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   │
│   ├── admin/                     # 管理者画面（カテゴリ・商品管理）
│   │   ├── category/
│   │   ├── product/
│   │   └── index.tsx
│   │
│   ├── image-preview/             # 画像生成プレビュー
│   │   ├── layouts/               # 単品/複数/一覧の3パターン
│   │   └── index.tsx
│   │
│   └── shared/                    # 共通
│       ├── components/            # 共通UIコンポーネント
│       ├── types/                  # 型定義
│       ├── mock-data/             # モックデータ
│       │   ├── categories.json
│       │   └── products.json
│       └── utils/                 # ユーティリティ
│
├── public/                       # 静的アセット
│   ├── logo.png                  # 買取専門店WOWロゴ
│   └── ...
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. 各ディレクトリの責務

### 2.1 docs/

永続的ドキュメントを格納。仕様変更時は本ディレクトリのドキュメントを更新する。

### 2.2 src/buyback-ticket/

買取票Webページ。商品一覧表示、チェックボックス選択、数量入力、合計計算、買取同意書への導線を担当。

### 2.3 src/consent-form/

買取同意書フォーム。個人情報入力、買取票からの商品・数量引き継ぎ、送信（モック）を担当。

### 2.4 src/admin/

管理者画面。カテゴリ・商品の一覧・追加・編集・削除を担当。モックデータで動作。

### 2.5 src/image-preview/

画像生成プレビュー。選択商品から3パターン（単品/複数/一覧）のプレビュー画像を生成・表示。

### 2.6 src/shared/

- **components**: ボタン、入力フィールド、レイアウト等の共通UI
- **types**: Category, Product, SelectedItem, ConsentFormInput 等の型定義
- **mock-data**: 開発・デモ用のモックデータ
- **utils**: 合計計算、日付フォーマット等のユーティリティ

---

## 3. 命名規則

### 3.1 ファイル

| 種別 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `ProductCard.tsx` |
| フック | camelCase + use | `useSelectedItems.ts` |
| ユーティリティ | camelCase | `calculateTotal.ts` |
| 型定義 | PascalCase | `types.ts` |

### 3.2 コンポーネント

- 1ファイル1コンポーネント
- コンポーネント名はファイル名と一致

### 3.3 モックデータ

- `categories.json`, `products.json` 等、エンティティ名をファイル名に使用

---

## 4. モックデータの配置

| ファイル | 内容 |
|----------|------|
| `src/shared/mock-data/categories.json` | カテゴリ一覧 |
| `src/shared/mock-data/products.json` | 商品一覧（categoryIdで紐づけ） |

初期データは [functional-design.md](functional-design.md) の対象カテゴリ（ポケモン未開封、ワンピース未開封、AR最低保証）に合わせて用意する。

---

## 5. 将来拡張時の方針

本番実装フェーズでは以下のディレクトリを追加する想定。

```
├── integrations/       # X API、LINE API、Sheets API 連携
├── api/                # バックエンドAPI（必要な場合）
└── scripts/            # デプロイ・運用スクリプト
```

---

## 改訂履歴

| 版数 | 日付 | 変更内容 |
|------|------|----------|
| 1.0 | 2026-03-04 | 初版作成（MVPスコープ） |
