import { ColumnType } from "@/types/board-data";

export const findTask = (columns: ColumnType[], taskId: string) => {
  console.log("taskIdZZZ", taskId)
  console.log("columnsZZZ", columns)
  for (const column of columns) {
    for (const task of column.tasks) {
      if (task.id === taskId) {
        return task;
      }
    }
  }
  return null;
};

export const findColumn = (columns: ColumnType[], taskId: string) => {
  for (const column of columns) {
    for (const task of column.tasks) {
      if (task.id === taskId) {
        return column;
      }
    }
  }
  return null;
};
