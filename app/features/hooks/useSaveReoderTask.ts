import { columnsState } from "@/recoils/atoms/boardState";
import { ColumnType, TaskType } from "@/types/board-data";
import axios from "axios";
import { useRecoilState } from "recoil";

const useSaveReorderTask = (
  token: string,
  activeTask: TaskType,
  taskParams: {},
  columns: ColumnType[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>
) => {
  const saveReorderTask = async () => {
    if (!activeTask) return;
    const taskId = activeTask.id.replace("task-", "");
    console.log("taskParams", taskParams);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${taskId}/move`;

      const response = await axios.put(url, taskParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      if (response.data.newTaskId) {
        const newTaskId = `task-${response.data.newTaskId}`;
        const destinationColumnId = `column-${response.data.destinationColumnId}`;
        const newColumns = columns.map((column) => {
          if (column.id === destinationColumnId) {
            return {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task.id === activeTask.id) {
                  return {
                    ...task,
                    id: newTaskId,
                  };
                }
                return task;
              }),
            };
          }
          return column;
        });
        // 不要かもしれない
        setColumns(newColumns);
      }
    } catch (error) {
      console.error("データの取得に失敗しました。", error);
    }
  };
  saveReorderTask();
};

export default useSaveReorderTask;
