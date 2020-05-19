# MovieEditor FrontEnd

## 概要
開発中のElectron製の動画編集ソフトウェアです。  

## 開発に関する規約

### Components
- Atomic Designを採用する
- 予め全てのページのデザインを制作し、Atomレベルからコンポーネントを開発する.

### CSS Framework
- Vuetifyを採用する

### テスト
- テスト駆動開発をある程度採用する
- Unit Test (Spectron), E2E Testを併用する

### TypeScriptの利用について
- ある程度開発を進めた後、置き換えられる部分からTypeScriptに書き換える方式を取る.
- Vuex周りなど、TypeScriptのサポートが発達中の分野についてはJSで記述することを許容する.

### Lint
- ESLint / JavaScript Standard を採用する
