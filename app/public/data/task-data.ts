import BoardType from "@/types/board-data";
import boardData from "./board-data.json";

const boards: BoardType[] = boardData;
if (!Array.isArray(boards)) {
  console.error("boardData is not an array");
}
if (!boards) {
  console.error("boards is undefined");
}

export const taskData = boards.flatMap((board) =>
  board.columns.flatMap((column) =>
    column.tasks.map((task, index) => ({
      ...task,
      description: `description-${index}`, // descriptionプロパティを追加
    }))
  )
);
