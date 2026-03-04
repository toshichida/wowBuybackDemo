# 買取専門店WOW - トレーディングカード買取システム（モックアップ）

トレーディングカード買取の買取票・買取同意書フォーム・管理者画面のモックアップアプリケーションです。

## 必要環境

- Node.js 18.x 以上
- npm / yarn / pnpm

## セットアップ手順

```bash
# リポジトリクローン
git clone <repository-url>
cd wowBuybackDemo

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

## スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動（http://localhost:5173） |
| `npm run build` | 本番用ビルド |
| `npm run lint` | ESLint でコード品質チェック |
| `npm run format` | Prettier でコードフォーマット |
| `npm run preview` | ビルド後のプレビュー |

## ディレクトリ構成

```
src/
├── buyback-ticket/    # 買取票ページ
├── consent-form/      # 買取同意書フォーム
├── admin/             # 管理者画面
├── image-preview/     # 画像生成プレビュー
└── shared/            # 共通コンポーネント・型・モックデータ
```

## 技術スタック

- React 19 + TypeScript
- Vite
- Tailwind CSS
- ESLint + Prettier

## デモ手順

1. **買取票**: `npm run dev` で起動後、http://localhost:5173 にアクセス
2. カテゴリタブ（ポケモン/ワンピース/AR保証）で商品を切り替え
3. 商品のチェックボックスをオンにし、数量を入力
4. 合計金額を確認し「買取同意書へ進む」をクリック
5. **買取同意書**: 個人情報を入力し「同意して送信」でモック送信
6. **画像プレビュー**: 買取票で商品選択後「画像プレビュー」ボタン、または管理者画面から「画像プレビュー（全商品）」で3パターンのプレビュー画像を確認
7. **管理者画面**: /admin でカテゴリ・商品の追加・編集・削除（localStorageに保存、買取票に反映）

## レスポンシブ

スマートフォン（375px幅）での表示・操作に対応しています。

## ドキュメント

詳細な仕様は `docs/` ディレクトリを参照してください。
