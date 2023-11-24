import boardData from "../../public/data/board-data.json";

import { atom } from "recoil";
import BoardType, { ColumnType, TaskType } from "../../types/board-data"; // 上記で定義した型定義をインポート

// ボードの初期データ
export const boardState = atom<BoardType>({
  key: "board",
  default: undefined,
});

// カラムリストの初期データ
export const columnsState = atom<ColumnType[]>({
  key: "columns",
  default: [],
});

// モーダルで表示するタスクの初期データ
type ModalTaskType = {
  task: TaskType;
  columnName: string | undefined;
};

export const modalTaskState = atom<ModalTaskType | undefined>({
  key: "modalTask",
  default: undefined,
});

export const activeTaskState = atom<TaskType | undefined>({
  key: "activeTask",
  default: undefined,
});

export const activeColumnState = atom<ColumnType | undefined>({
  key: "activeColumn",
  default: undefined,
});
