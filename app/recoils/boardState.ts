import boardData from "../public/data/board-data.json";
import boardListData from "../public/data/board-list.json";
import taskData from "../public/data/task-data.json";
import { atom } from "recoil";
import BoardType, { ColumnType, TaskType } from "../types/board-data"; // 上記で定義した型定義をインポート

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

// タスクリストの初期データ
export const tasksState = atom<TaskType[]>({
  key: "tasks",
  default: taskData,
});

// モーダルで表示するタスクの初期データ
type ModalTaskType = {
  task: TaskType;
  columnTitle: string | undefined;
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
