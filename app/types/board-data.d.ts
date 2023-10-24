type TaskType = {
  id: number;
  name: string;
  description: string;
};

type ColumnType = {
  id: number;
  name: string;
  tasks: Record<TaskType[]>;
};

type BoardType = {
  id: number;
  image: string;
  name: string;
  columns: Record<ColumnType[]>;
};

export default BoardType;
