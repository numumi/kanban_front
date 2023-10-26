import boardData from "../public/data/board-data.json";
import boardListData from "../public/data/board-list.json";
import { atom } from "recoil";
import BoardType, { ColumnType } from "../types/board-data"; // 上記で定義した型定義をインポート

// ボードの初期データ
export const boardState = atom<BoardType>({
  key: "board",
  default: boardData,
});

// カラムリストの初期データ
export const columnsState = atom<ColumnType[]>({
  key: "columns",
  default: boardData.columns,
});
