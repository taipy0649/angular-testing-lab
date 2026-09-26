# Frontend architecture

このプロジェクトはFeature-Sliced DesignをAngular向けに適用しています。

```text
src/
├── app/       # 起動設定、ルーティング、最上位レイアウト
├── pages/     # ルートに対応する画面
├── widgets/   # 複数の機能・エンティティを組み合わせるUIブロック
├── features/  # ユーザー操作を表す機能
├── entities/  # 業務上の主要概念
└── shared/    # 業務知識を持たない共通コード
```

依存は上から下にだけ向けます。例えば、`pages` は `widgets` 以下を利用できますが、
`shared` から `features` や `pages` を参照してはいけません。同一レイヤーの別スライスも
直接参照せず、外部公開する要素は各スライス直下の `index.ts` から公開します。

## Angular conventions

- 新しいコードはスタンドアロンコンポーネントとして作成します。
- コンポーネントの依存関係は `imports` に明示します。
- TypeScriptとAngularテンプレートのstrict検査を有効にします。
- テンプレートからだけ使うクラスメンバーは `protected` にします。
- 変更しないプロパティは `readonly` にします。
- 小さなテンプレートは公式チュートリアルと同様に、コンポーネントの `template` へ記述します。
- テンプレートが大きくなった場合は、同じ名前のHTMLファイルへの分離を検討します。
- スタイリングはTailwind CSSのユーティリティクラスを基本とし、独自CSSは必要な場合だけ追加します。
