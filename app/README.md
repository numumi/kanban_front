## 概要
- Next.js学習でカンバンボードを作成  
- ドラッグアンドドロップはdnd-kitを使用
- カラムの移動とタスクの移動ができる
- dnd-kitのcontext内ではintercepting routeが使えないため bodyタグにモーダルを描写
- 認証はauth0でFEからBEにtokenを送って検証後にレスポンスを返す

### 課題
- WebSocket通信
- テスト(実装中)
- ESLint
- エラーハンドリング
- 認可

### URL  
https://kanban-front-one.vercel.app/

### APIのリポジトリ
https://github.com/numumi/kanban_api
