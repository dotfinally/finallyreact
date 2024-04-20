# .finally(React)

### シンプルさと機能性の出会い

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)
[![en](https://img.shields.io/badge/lang-English-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/README.md)
[![es](https://img.shields.io/badge/lang-Spanish-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.es.md)
[![ko](https://img.shields.io/badge/lang-Korean-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ko.md)
[![zh-CN](https://img.shields.io/badge/lang-Simplified--Chinese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.zh-CN.md)

FinallyReactは、柔軟性と使いやすさを念頭に置いて作られたReactデザインライブラリです。

- Reactアプリケーション用の完全なデザインとコンポーネントライブラリ
- 任意のコンポーネントのデフォルトスタイルを簡単に削除し、自分のブランドに合わせてスタイリングできます
- あなたのクラス名がコンポーネントスタイリングに優先します
- スタイリングを高速化するための包括的なユーティリティクラスのショートカットセット
- アクセシビリティに焦点を当て、テスト済み

## ドキュメンテーション

[FinallyReactウェブサイト](https://finallyreact.com)で、すべてのコンポーネント、デザイン、ユーティリティエレメントの例を見つけることができます（完全にFinallyReactで構築されています）。

## あなたのプロジェクトでの使用

- `npm install finallyreact`
- あなたのアプリでFinallyReactのCSSをインポートする、おそらくトップレベルのアプリファイルで：
  - `import 'finallyreact/main.css'`
- 必要に応じてコンポーネントをインポートする、例えば：
  - `import { Column, Row, Card } from 'finallyreact'`
- （オプション）プロジェクトのルートに設定ファイルを作成する（下記参照）
- （オプション）PurgeCSSを使用してCSSバンドルのサイズを減らす（下記参照）

### 設定（オプション）

グローバル設定を行うには、プロジェクトのルートに`finally.config.js`ファイルを作成します。

以下は利用可能なオプションとデフォルト値です：

```js
export default {
  breakpoints: {
    xs: 600,
    sm: 900,
    md: 1200,
    lg: 1600,
    xl: 2000,
    xxl: 2400
  },
  simple: false
};
```

### PurgeCSS（オプション）

CSSバンドルのサイズを減らすために、PostCSSとPurgeCSSを使用することができます。
`examples` フォルダーにある `postcss.config.js` ファイルの例を見つけることができます。

注：PurgeCSSの内容には`node_modules/finallyreact/index.js`を含めてください。あなたのアプリがモノレポ内にある場合は、node_modulesへのパスを使用してください。例えば：`../../node_modules/finallyreact/index.js`

## ライセンス

著作権 © 2023-2024 `dotfinally, LLC`

MITライセンスの下で利用可能で、これは誰でも任意の目的で無料でFinallyReactを使用できることを意味します。リポジトリのLICENSE.txtファイルで完全なライセンステキストを読んでください。

FinallyReactは、ReactJSチームやMeta Platforms, Inc.とは提携も認可もされていません。

## 開発

あなたのコンピュータでFinallyReactをローカルで実行し、変更を加えたりテストしたりしたい場合：

### 必須条件

- NodeJS 18.16.1以上
- NPM 9.7.2以上
- React 16.8以上

（古いバージョンのNodeも動作する可能性がありますが、テストはされていません）

### セットアップ

- `npm install`

### ビルド

- ルートから`npm run build`を実行して、コンパイルされたファイルを含むlibフォルダを作成します
- 別のアプリで変更をローカルでテストするには、作成されたlibフォルダ内で`npm run link`を実行し、外部アプリで`npm link finallyreact`を実行します
- 開発中に変更をビルドし、監視するために、ルートから`npm run build:watch`を実行します（最初に少なくとも一度`npm run build`を実行してください）

### テスト

- `npm run test`

## FAQとトラブルシューティング

- FinallyReactのスタイルを含めた後、私のプロジェクトのビルドサイズが大きすぎます

  - CSSバンドルのサイズを減らすためにPurgeCSSを使用してみてください（上記の手順を参照）

- 私のNextJSの\_app.jsファイルで`finallyreact/main.css`をインポートしても、スタイルが正しく適用されません

  - 別の.scssファイルでインポートしてみてください。`@import '~finallyreact/main.css';`を使用します

- なぜほとんどのコンポーネントスタイルがSASSではなくTSファイルで書かれているのですか？
  - SASS/CSSにすべてのスタイルを持つ最大の問題は、カスタムクラスでそれらを上書きすることです。あなたは、独自のクラスを使用するとカスタマイズが難しい他の多くのReactコンポーネントライブラリでこの問題を経験したかもしれません。これは、正確で複雑なCSS構造をターゲットにするためにコンポーネントを調べる必要があることを意味します。FinallyReactはこれをはるかに簡単にします！FinallyReactのユーティリティクラス名を使用すると、同じ「グループ」内の任意のデフォルトスタイルは、あなたの上書きに優先して削除されます。さらに、任意のコンポーネントの`simple`プロパティを設定して、すべてのデフォルトスタイルを削除し、独自のスタイルを追加することをさらに簡単にします。
