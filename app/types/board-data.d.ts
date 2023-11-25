export type TaskType = {
  id: string;
  name: string;
  description?: string;
};

export type ColumnType = {
  id: string;
  name: string;
  board_id: number
  tasks: TaskType[];
};

type BoardType = {
  id: number;
  image: string;
  name: string;
  columns: ColumnType[];
};

export default BoardType;
