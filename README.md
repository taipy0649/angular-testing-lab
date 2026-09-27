# Angular Testing

Angularアプリケーションで利用するテストの全体像と、このリポジトリに用意されている実装例・実行方法をまとめています。

## テストの全体像

コード品質を継続的に確認する方法には、コードを実行せずに問題を探す静的解析と、コードを実行して振る舞いを確かめる自動テストがあります。自動テストは、確認する範囲によって大きく3つに分けられます。

```text
                         少数・低速
                    ┌──────────────┐
                    │     E2E      │  ユーザー操作をブラウザで確認する
                ┌───┴──────────────┴───┐
                │ コンポーネントテスト │  Angularの表示や振る舞いを確認する
            ┌───┴──────────────────────┴───┐
            │        ユニットテスト        │  関数などの小さな単位を確認する
            └──────────────────────────────┘
            ────────────────────────────────
                     静的解析                  型・記述ルール・形式を確認する
                         多数・高速
```

下の層ほど小さく高速で、失敗した原因を特定しやすいテストです。上の層ほど実際の利用方法に近い一方で、実行時間や保守コストが大きくなります。

静的解析はテストのように実行時の振る舞いを確認するものではありませんが、型の不整合やコーディングルール違反を早い段階で検出する品質チェックとして機能します。

すべてをE2Eテストで確認するのではなく、静的解析で検出できる問題は静的解析に任せ、振る舞いの確認には適切な層のテストを選びます。

## このリポジトリで扱うもの

このリポジトリでは、次の4つを実際に試せます。

| #   | 対象                  | できること                                               | 使用するもの                            | 実装例                                                                                                                       |
| --- | --------------------- | -------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | コード全体            | 型、記述ルール、スタイル、フォーマットを確認する         | TypeScript、ESLint、Stylelint、Prettier | [`package.json`](frontend/package.json)                                                                                      |
| 2   | TypeScriptのロジック  | 入出力、境界値、例外を小さな単位で確認する               | Vitest                                  | [`divide.spec.ts`](frontend/src/shared/utils/divide.spec.ts)                                                                 |
| 3   | Angularコンポーネント | コンポーネントの生成、依存関係、表示内容を確認する       | Angular TestBed + Vitest                | [`app.spec.ts`](frontend/src/app/app.spec.ts)、[`home-page.spec.ts`](frontend/src/pages/home/ui/home-page/home-page.spec.ts) |
| 4   | ユーザーフロー        | 実際のブラウザで画面遷移や表示などの一連の動作を確認する | Playwright                              | [`home.spec.ts`](frontend/e2e/tests/home.spec.ts)                                                                            |

## 準備

Node.jsとnpmを用意し、依存パッケージをインストールします。

```bash
cd frontend
npm install
```

E2Eテストも実行する場合は、Playwrightが使用するChromiumをインストールします。

```bash
npx playwright install chromium
```

以降のコマンドは、すべて `frontend` ディレクトリで実行します。

## 静的解析でコード品質を確認する

静的解析では、アプリケーションやテストを実行する前に、型の不整合、コードやCSSのルール違反、フォーマットの差異を検出します。

```bash
npm run check
```

このコマンドだけで、AngularアプリケーションとE2Eテストの型チェック、TypeScriptとAngularのLint、CSSのLint、フォーマット確認をまとめて実行できます。変更後に実行し、エラーがないことを確認します。

## ロジックのユニットテスト

最初に、Angularへ依存しないTypeScriptの関数をテストします。

対象の [`divide.ts`](frontend/src/shared/utils/divide.ts) は、2つの数値を受け取って割り算を行う関数です。[`divide.spec.ts`](frontend/src/shared/utils/divide.spec.ts) では、次の振る舞いを確認しています。

- 2つの数値を割り算できる
- 負数と小数を扱える
- 0で割ると `RangeError` を投げる

### 実行する

```bash
npm test
```

`npm test` は `package.json` の `test` スクリプト（`ng test`）を実行します。起動後はファイルの変更を監視し、テストを自動で再実行します。終了するときは `Ctrl+C` を押します。

テスト結果に `divide` の3つのケースが表示され、すべて成功することを確認します。

### テストを追加するとき

1. 関数にどのような入力を渡すか決める
2. 戻り値、または発生する例外を期待値として書く
3. 通常の値だけでなく、0、負数、小数などの境界値も検討する
4. テストを実行し、意図した振る舞いになっていることを確認する

小さなロジックは、AngularコンポーネントやE2Eを使わず、この層で素早く確認します。

## Angularコンポーネントのテスト

次に、Angular TestBedを使ってコンポーネントをテストします。

- [`app.spec.ts`](frontend/src/app/app.spec.ts) は、アプリケーションを生成できることと `router-outlet` が表示されることを確認します
- [`home-page.spec.ts`](frontend/src/pages/home/ui/home-page/home-page.spec.ts) は、ホーム画面に見出しが表示されることを確認します

### 実行する

```bash
npm test
```

ロジックのユニットテストと同じコマンドで、Angularコンポーネントのテストもまとめて実行されます。

### テストを追加するとき

1. `TestBed.configureTestingModule` の `imports` に対象のスタンドアロンコンポーネントを指定する
2. 必要な依存関係を `imports` または `providers` に追加する
3. `TestBed.createComponent` でコンポーネントを生成する
4. `fixture.detectChanges()` を呼び、初回の画面更新を反映する
5. `fixture.nativeElement` から、利用者に見える表示や状態を確認する

クラス内部の実装方法よりも、「何が表示されるか」「操作するとどう変わるか」のような外部から観察できる振る舞いを優先します。

## PlaywrightでE2Eテストを実行する

Playwrightでは、実際のブラウザを使ってユーザーに近い視点から確認します。[`home.spec.ts`](frontend/e2e/tests/home.spec.ts) はホーム画面を開き、見出しと説明文が表示されることを確認しています。

画面の開き方や要素の指定は [`home.page.ts`](frontend/e2e/pages/home.page.ts) にまとめ、テストシナリオから再利用しています。

### 実行する

```bash
npm run test:e2e
```

Angularの開発サーバーはPlaywrightによって自動で起動するため、事前に`npm start`する必要はない。

### E2Eテストを追加するとき

1. ユーザーにとって重要な一連の操作を1つ選ぶ
2. ページを開く処理と、繰り返し使う要素の指定をPage Objectへまとめる
3. テストシナリオには、ユーザーの操作と期待する結果を書く
4. ローカルで実行し、成功時と失敗時の両方を確認する
5. 不安定な待ち時間を固定値で追加せず、表示や状態の変化を待つ

失敗時のスクリーンショット、トレース、HTMLレポートは、Git管理対象外の出力ディレクトリに保存されます。最新のHTMLレポートは次のコマンドで開けます。

```bash
npm run test:e2e:report
```

## そのほかの確認コマンド

アプリケーションを起動する場合は、次のコマンドを実行して `http://localhost:4200/` を開きます。

```bash
npm start
```

## ディレクトリ構成

Angularアプリケーションのコードは **Feature-Sliced Design（FSD）**、E2Eテストは **Page Object Model（POM）** に沿って構成しています。

### Angularアプリケーション：Feature-Sliced Design

```text
frontend/
├── src/
│   ├── app/          # 起動設定、ルーティング、最上位レイアウト
│   ├── pages/        # ルートに対応する画面
│   ├── widgets/      # 複数の要素を組み合わせたUIブロック
│   ├── features/     # ユーザー操作を表す機能
│   ├── entities/     # 業務上の主要な概念
│   └── shared/       # 業務知識を持たない共通コード
└── .storybook/       # Storybook設定
```

FSDでは、上位のレイヤーから下位のレイヤーへ依存します。たとえば `pages` は `widgets` や `shared` を利用できますが、`shared` から `pages` を参照しません。詳しい設計ルールは [`frontend/src/README.md`](frontend/src/README.md) を参照してください。

### E2Eテスト：Page Object Model

```text
frontend/
├── e2e/
│   ├── pages/
│   │   └── home.page.ts    # 画面の要素、操作、確認処理をまとめるPage Object
│   └── tests/
│       └── home.spec.ts    # ユーザー視点のテストシナリオを記述する
└── playwright.config.ts    # 実行環境、ブラウザ、レポートなどの共通設定
```

Page Object Modelでは、画面に関する詳細とテストシナリオを分離します。

- `e2e/pages`：画面ごとにクラスを作り、要素の取得方法、画面操作、表示確認をまとめる
- `e2e/tests`：Page Objectを利用し、「画面を開く」「内容を確認する」といったユーザー視点のシナリオを書く
- `playwright.config.ts`：テスト対象のURL、使用するブラウザ、開発サーバー、レポートの出力先などを設定する

現在のテストでは、`home.spec.ts` が `HomePage` を生成し、`open()` と `expectWelcomeContent()` を呼び出します。見出しや説明文の探し方は `home.page.ts` に閉じ込めているため、HTML構造が変わってもテストシナリオへの影響を抑えられます。

コマンドの補足は [`frontend/README.md`](frontend/README.md) を参照してください。
