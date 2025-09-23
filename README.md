# 点と線と面 - ECサイト

デザインの基本要素から生まれる美しいプロダクトのECサイト

## 🌟 特徴

- **モダンな技術スタック**: Vanilla JavaScript + SCSS + Webpack
- **レスポンシブデザイン**: モバイルファーストで全デバイス対応
- **コンポーネント設計**: 拡張性と再利用性を重視した設計
- **アクセシビリティ**: WAI-ARIA準拠でスクリーンリーダー対応
- **パフォーマンス**: 最適化されたバンドルとレイジーローディング

## 🏗️ プロジェクト構造

```
tentosentomen/
├── index.html                 # エントリーポイント
├── package.json               # 依存関係管理
├── webpack.config.js          # Webpack設定
├── .gitignore                
├── src/                       # ソースコード
│   ├── js/                   # JavaScript
│   │   ├── main.js          # メインエントリー
│   │   ├── pages/           # ページコンポーネント
│   │   │   └── HomePage.js
│   │   └── components/      # 再利用可能コンポーネント
│   │       ├── Header.js
│   │       ├── Footer.js
│   │       ├── ProductCard.js
│   │       ├── NewsItem.js
│   │       └── Newsletter.js
│   ├── scss/                # SCSS
│   │   ├── main.scss        # メインスタイル
│   │   ├── base/            # 基本設定
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── _variables.scss
│   │   ├── components/      # コンポーネントスタイル
│   │   │   ├── _header.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _product-card.scss
│   │   │   ├── _news-item.scss
│   │   │   ├── _newsletter.scss
│   │   │   ├── _button.scss
│   │   │   └── _form.scss
│   │   ├── pages/           # ページ固有スタイル
│   │   │   └── _home.scss
│   │   └── utils/           # ユーティリティ
│   │       ├── _mixins.scss
│   │       └── _animations.scss
│   └── assets/              # 静的ファイル
│       ├── images/
│       └── fonts/
└── dist/                     # ビルド出力
```

## 🚀 セットアップ

### 前提条件

- Node.js (v16以上)
- npm または yarn

### インストール

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# プロダクション用ビルド
npm run build

# ファイル変更を監視
npm run watch
```

## 📱 開発

### 開発サーバー

```bash
npm run dev
```

開発サーバーが `http://localhost:3000` で起動します。

### ビルド

```bash
npm run build
```

最適化されたファイルが `dist/` フォルダに出力されます。

## 🧩 コンポーネント

### Header
- レスポンシブナビゲーション
- モバイルメニュー
- カート機能
- スクロール時のスタイル変更

### Footer
- サイトマップ
- ソーシャルメディアリンク
- 法的情報

### ProductCard
- 商品情報表示
- お気に入り機能
- ホバーアニメーション
- レスポンシブレイアウト

### NewsItem
- ニュース記事表示
- カテゴリータグ
- クリックイベント

### Newsletter
- メール登録フォーム
- バリデーション
- 送信状態管理
- エラーハンドリング

## 🎨 デザインシステム

### カラーパレット

```scss
$color-ivory: #FFFEF9;        // 背景色
$color-warm-gray: #6B5B56;    // メインテキスト
$color-warm-beige: #F8F4EC;   // セクション背景
$color-soft-pink: #F5E6E0;    // アクセント背景
$color-amber-600: #D97706;     // プライマリカラー
```

### タイポグラフィ

- **メインフォント**: Zen Maru Gothic
- **サブフォント**: M PLUS Rounded 1c
- **レスポンシブサイズ**: clamp()関数使用

### ブレークポイント

```scss
$breakpoint-sm: 640px;   // スマートフォン
$breakpoint-md: 768px;   // タブレット
$breakpoint-lg: 1024px;  // デスクトップ
$breakpoint-xl: 1280px;  // 大画面
```

## 🌐 ブラウザサポート

- Chrome (最新2バージョン)
- Firefox (最新2バージョン)
- Safari (最新2バージョン)
- Edge (最新2バージョン)

## 📦 主な依存関係

### 開発依存関係

- **Webpack**: モジュールバンドラー
- **Babel**: JavaScript変換
- **SASS**: CSS拡張
- **HTML Webpack Plugin**: HTML生成
- **Mini CSS Extract Plugin**: CSS分離

## 🔧 カスタマイズ

### 新しいページの追加

1. `src/js/pages/` に新しいページクラスを作成
2. `src/scss/pages/` に対応するSCSSファイルを作成
3. `main.js` でルーティング設定を追加

### 新しいコンポーネントの追加

1. `src/js/components/` にJavaScriptクラスを作成
2. `src/scss/components/` にSCSSファイルを作成
3. `main.scss` でインポート

### カラーテーマの変更

`src/scss/base/_variables.scss` でカラー変数を編集

## 🚀 デプロイ

### 静的サイトホスティング

```bash
# ビルド
npm run build

# dist/ フォルダの内容をサーバーにアップロード
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Vercel

```bash
# Build command
npm run build

# Output directory
dist
```

## 🎯 今後の拡張案

### 機能追加
- [ ] 商品検索・フィルタリング
- [ ] ショッピングカート機能
- [ ] ユーザー認証
- [ ] 商品詳細ページ
- [ ] 注文履歴
- [ ] レビュー・評価システム

### 技術改善
- [ ] TypeScript対応
- [ ] PWA対応
- [ ] 国際化 (i18n)
- [ ] ダークモード
- [ ] E2Eテスト追加

## 📄 ライセンス

このプロジェクトはMITライセンスで公開されています。

## 🤝 コントリビューション

プルリクエストや課題報告を歓迎します。

---

**点と線と面** - デザインの基本要素をWebで表現