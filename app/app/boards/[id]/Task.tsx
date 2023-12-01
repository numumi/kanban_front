"use client";
import BoardType, { ColumnType, TaskType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ClearIcon from "@mui/icons-material/Clear";

import { useRecoilState } from "recoil";
import { columnsState, modalTaskState } from "@/recoils/atoms/boardState";
import axios from "axios";
import { useState } from "react";

type TaskProps = {
  task: TaskType;
  cursor?: string;
  column?: ColumnType;
};

const Task = ({ task, cursor, column }: TaskProps) => {
  const [modalTaskData, setModalTaskData] = useRecoilState(modalTaskState);
  const [isClearing, setIsClearing] = useState(false);
  const [columns, setColumns] = useRecoilState(columnsState);
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
    if (isClearing) {
      console.log("handleClearing");
      setIsClearing(false);
      return;
    }
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
      console.log("response.data", response.data);
      const _modalTaskData = {
        task: response.data,
        column: column,
      };
      setModalTaskData(_modalTaskData);
    } catch (error) {
      console.error("データの取得に失敗しました。", error);
    }
  };

  const handleClear = async () => {
    if (!column) return;
    setIsClearing(true);
    const taskParams = {
      id: task.id.replace("task-", ""),
      column_id: column.id.replace("column-", ""),
    };

    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_PROD_API_URL}tasks/${taskParams.id}`
          : `http://localhost:3000/tasks/${taskParams.id}`;
      await axios.delete(url, { params: { column_id: taskParams.column_id } });
      const newColumns = columns.map((_column) => {
        if (_column.id !== column.id) {
          return _column;
        }
        return {
          ..._column,
          tasks: _column.tasks.filter((_task) => _task.id !== task.id),
        };
      });
      setColumns(newColumns);
    } catch (error) {
      console.error("データの送信に失敗しました。", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500 ${cursor} group`}
      onMouseUp={handleMouseUp}
    >
      <div className="flex justify-between items-center w-full">
        {task.name}
        <ClearIcon
          className="cursor-pointer hover:bg-gray-300 ml-2 opacity-0 group-hover:opacity-100"
          style={{ fontSize: "1.25rem" }}
          onMouseDown={handleClear}
        />
      </div>
    </div>
  );
};

export default Task;
