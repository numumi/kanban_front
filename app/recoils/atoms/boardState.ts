import { atom } from "recoil";
import BoardType, { ColumnType, TaskType } from "../../types/board-data"; // 上記で定義した型定義をインポート
import { Board } from "@/types/board-list";

// ボードリストの初期データ
export const boardsState = atom<Board[]>({
  key: "boards",
  default: [],
});

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
  column: ColumnType;
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

export const selectedBoardIdState = atom<number | null>({
  key: "selectedBoardId",
  default: 0,
});
