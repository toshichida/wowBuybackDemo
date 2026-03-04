# モックアップ実装タスクリスト

| 項目 | 内容 |
|------|------|
| 参照元 | docs/ 内の永続的ドキュメント |
| 最終更新日 | 2026-03-04 |
| 版数 | 1.0 |

---

## Cursor Agent 向けガイド

各フェーズの開発時、**必ず「参照ドキュメント」に記載された @docs/ のファイルを参照**してから実装してください。  
`@docs/product-requirements.md` のようにファイルを指定すると、Cursorが該当ドキュメントの内容を参照して開発できます。

---

## Phase 0: プロジェクト初期化

**参照ドキュメント**:  
@docs/technical-specification.md  
@docs/repository-structure.md  
@docs/development-guidelines.md  

- [x] フロントエンドプロジェクトを初期化（React + Vite または Next.js）
- [x] TypeScript、ESLint、Prettier を設定
- [x] Tailwind CSS を導入
- [x] repository-structure.md に従い、src/ 配下のディレクトリ構造を作成
- [x] public/ にロゴ用プレースホルダーを配置
- [x] package.json に lint / dev / build スクリプトを設定
- [x] README.md にセットアップ手順を記載

---

## Phase 1: 共通基盤・データ層

**参照ドキュメント**:  
@docs/technical-specification.md  
@docs/repository-structure.md  
@docs/ubiquitous-language.md  
@docs/functional-design.md  

- [x] shared/types/ に Category, Product, SelectedItem, ConsentFormInput の型定義を作成
- [x] shared/mock-data/categories.json を作成（ポケモン未開封、ワンピース未開封、AR最低保証）
- [x] shared/mock-data/products.json を作成（各カテゴリに紐づく商品を初期データとして用意）
- [x] shared/utils/ に合計計算ユーティリティ（calculateTotal）を作成
- [x] shared/components/ に共通ボタン・入力フィールド等の基本UIコンポーネントを作成
- [x] ルーティング設定（買取票、買取同意書、管理者画面のパスを定義）

---

## Phase 2: 買取票ページ

**参照ドキュメント**:  
@docs/functional-design.md  
@docs/product-requirements.md  
@docs/technical-specification.md  
@docs/repository-structure.md  
@docs/ubiquitous-language.md  

- [x] ヘッダーに「買取専門店WOW」ロゴを表示
- [x] カテゴリタブ/フィルターを実装（ポケモン/ワンピース/AR保証で切り替え）
- [x] 商品一覧を表示（商品画像 + 商品名 + 買取価格）
- [x] 各商品にチェックボックスと数量入力フィールドを配置
- [x] 選択商品 × 数量 × 買取価格の合計をリアルタイム計算・表示
- [x] 「買取同意書へ進む」CTAボタンを配置
- [x] 選択商品・数量を買取同意書フォームに引き継ぐ（URLパラメータ or sessionStorage）
- [x] 1商品も選択していない場合はCTAを無効化または警告表示

---

## Phase 3: 買取同意書フォーム

**参照ドキュメント**:  
@docs/functional-design.md  
@docs/product-requirements.md  
@docs/technical-specification.md  
@docs/ubiquitous-language.md  

- [x] 買取票から引き継いだ商品・数量を表示（編集可能 or 読み取り専用）
- [x] 合計見積金額を自動計算して表示
- [x] 入力項目1〜12を実装（氏名、読み仮名、性別、職業、生年月日、電話、メール、住所、銀行口座、適格請求書該否、Xアカウント、身分証ファイル選択）
- [x] 身分証はファイル選択のみ（実保存なし）
- [x] 注意書き・免責事項の文言を表示
- [x] 「同意して送信」ボタンを配置
- [x] 必須項目のバリデーションを実装
- [x] 送信時に「送信完了」モーダル/トーストを表示（実送信はモック）
- [x] 買取票から遷移していない場合のフォールバック表示（商品選択を促す導線）

---

## Phase 4: 買取票⇔フォームの導線統合

**参照ドキュメント**:  
@docs/functional-design.md  
@docs/technical-specification.md  
@docs/product-requirements.md  

- [x] 買取票の「買取同意書へ進む」からフォームへ遷移し、選択データが引き継がれることを確認
- [x] フォームから買取票へ戻るリンク/ボタンを配置（必要に応じて）
- [x] 二度手間が発生しない導線であることを確認
- [x] 顧客フロー（買取票→同意書→送信完了）が一連の操作で完了することを確認

---

## Phase 5: 管理者画面

**参照ドキュメント**:  
@docs/functional-design.md  
@docs/product-requirements.md  
@docs/technical-specification.md  
@docs/repository-structure.md  

- [x] 管理者画面のルート/レイアウトを実装
- [x] カテゴリ一覧表示
- [x] カテゴリの追加・編集・削除（ローカルストレージ or モック状態で動作）
- [x] 商品一覧表示（画像・商品名・買取価格・カテゴリ）
- [x] 商品の追加・編集・削除（商品名・買取価格・カテゴリ・画像URL）
- [x] カテゴリ削除時に紐づく商品がある場合は警告を表示
- [x] 管理者画面の変更が買取票・フォームに反映されることを確認（モックデータを共有している場合）

---

## Phase 6: 画像生成プレビュー

**参照ドキュメント**:  
@docs/functional-design.md  
@docs/technical-specification.md  
@docs/product-requirements.md  

- [x] 画像プレビュー画面のルートを実装
- [x] パターンA「単品表示」: 1商品を大きく表示（商品画像 + 商品名 + 買取価格）
- [x] パターンB「複数表示」: 2〜10商品をグリッド配置で1枚に合成
- [x] パターンC「一覧表示」: 多数商品を一覧形式で表示
- [x] 全パターンに「買取専門店WOW」ロゴを配置
- [x] X投稿用アスペクト比（16:9 または 1:1）、1200px幅程度で出力
- [x] 買取票または管理者画面から選択した商品をプレビューに渡す導線を実装
- [x] Canvas API または SVG + データURL で画像を生成・表示

---

## Phase 7: 統合・レスポンシブ・品質確認

**参照ドキュメント**:  
@docs/development-guidelines.md  
@docs/product-requirements.md  
@docs/functional-design.md  

- [x] 全画面でスマートフォン（375px幅）のレスポンシブ表示を確認
- [x] 買取票ページが3秒以内に表示されることを確認
- [x] 画像プレビューが10秒以内に生成されることを確認
- [x] 必須項目未入力時に適切なエラーフィードバックが表示されることを確認
- [x] 顧客デモで見せられる完成度であることを確認
- [x] ESLint / Prettier でコード品質をチェック
- [x] README に起動方法・デモ手順を追記

---

## 改訂履歴

| 版数 | 日付 | 変更内容 |
|------|------|----------|
| 1.0 | 2026-03-04 | 初版作成 |
