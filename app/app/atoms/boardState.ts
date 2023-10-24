import boardData from "../../public/data/board-data.json";
import boardListData from "../../public/data/board-list.json";
import { atom } from "recoil";
import BoardType from "../../types/board-data"; // 上記で定義した型定義をインポート

// ボードの初期データ
export const boardState = atom({
  key: "board",
  default: undefined,
});


