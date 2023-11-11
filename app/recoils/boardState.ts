import boardData from "../public/data/board-data.json";
import boardListData from "../public/data/board-list.json";

import { atom } from "recoil";
import BoardType, { ColumnType, TaskType } from "../types/board-data"; // 上記で定義した型定義をインポート

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

// タスクリストの初期データ
const boards: BoardType[] = boardData;
if (!Array.isArray(boards)) {
  console.error('boardData is not an array');
}
if (!boards) {
  console.error('boards is undefined');
}

export const taskData = boards.flatMap((board) =>
  board.columns.flatMap((column) =>
    column.tasks.map((task, index) => ({
      ...task,
      description: `description-${index}`, // descriptionプロパティを追加
    }))
  )
);
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
