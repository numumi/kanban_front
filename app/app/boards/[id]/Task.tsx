"use client";
import BoardType, { ColumnType, TaskType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  useRecoilState,
} from "recoil";
import { modalTaskState } from "@/recoils/atoms/boardState";
import axios from "axios";

type TaskProps = {
  task: TaskType;
  cursor?: string;
  column?: ColumnType;
};

const Task = ({ task, cursor, column }: TaskProps) => {
  const [modalTask, setModalTask] = useRecoilState(modalTaskState);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseUp = async () => {
    if (!column) return;
    const taskParams = {
      id: task.id.replace("task-", ""),
      column_id: column.id.replace("column-", ""),
    };
    try {
      const url = `http://localhost:3000/tasks/${taskParams.id}`;
      const response = await axios.get(url, {
        params: {
          column_id: taskParams.column_id,
        },
      });
      console.log("response.data", response.data)
      const _modalTask = {
        task: response.data,
        columnName: column.name,
      };
      setModalTask(_modalTask);
    } catch (error) {
      console.error("データの取得に失敗しました。", error);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500 ${cursor}`}
      onMouseUp={handleMouseUp}
    >
      {task.name}
    </div>
  );
};

export default Task;
