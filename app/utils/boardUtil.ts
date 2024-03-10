import { ColumnType, TaskType } from "@/types/board-data";

export const findTask = (columns: ColumnType[], taskId: string) => {
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

export const updateTaskInColumns = (
  columns: ColumnType[],
  updatedTask: TaskType,
  columnId: string
) => {
  return columns.map((column) => {
    if (column.id !== columnId) return column;
    return {
      ...column,
      tasks: column.tasks.map((task) =>
        task.id !== updatedTask.id ? task : updatedTask
      ),
    };
  });
};
