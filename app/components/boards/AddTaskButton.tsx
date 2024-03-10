"use client";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType, TaskType } from "@/types/board-data";
import { columnsState } from "@/recoils/atoms/boardState";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import tokenState from "@/recoils/atoms/tokenState";
import { useOutsideClick } from "@/hooks/useOutSideClick";
import { createTaskApi } from "@/app/api/taskApi";

type ColumnProps = {
  column: ColumnType;
};
const AddTaskButton: React.FC<ColumnProps> = (props) => {
  const { column } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [columns, setColumns] = useRecoilState(columnsState);
  const token = useRecoilValue(tokenState);

  // useRefを使用してコンポーネントのrefを作成
  const wrapperRef = useRef(null);

  const handleAddForm = () => {
    setIsEditing(true);
  };
  const handleCancelAdd = () => {
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInput(e.target.value);
  };
  const handleSubmit = async () => {
    if (taskInput === "") {
      setIsEditing(false)
      return ;
    }

    const newTaskParams = {
      task: {
        name: taskInput,
      },
      column_id: column.id.replace("column-", ""),
    };

    try {
      const response = await createTaskApi(token, newTaskParams);

      const newTask: TaskType = {
        id: `task-${response.data.id}`,
        name: taskInput,
        description: "",
      };
      const newColumn = { ...column, tasks: [...column.tasks, newTask] };
      const newColumns = columns.map((column) => {
        if (column.id === newColumn.id) {
          return newColumn;
        }
        return column;
      });
      setColumns(newColumns);
      setTaskInput("");
      setIsEditing(false);
    } catch (error) {
      console.error("データの送信に失敗しました。", error);
      setTaskInput("");
      setIsEditing(false);
    }
  };

  // カスタムフックを使用して、外側のクリックを検出
  useOutsideClick(wrapperRef, handleSubmit);
  return (
    <div>
      {isEditing ? (
        <div ref={wrapperRef}>
          <form className="mt-2 ml-2 mr-2">
            <textarea
              className="w-full p-1 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500"
              placeholder="タイトルを入力"
              autoFocus
              onChange={handleChange}
            />
          </form>

          <div className="flex ml-2 mr-2">
            <button
              onClick={handleSubmit}
              className="p-1 bg-blue-400 rounded cursor-pointer hover:bg-blue-400 text-white"
            >
              追加
            </button>
            <button
              onClick={handleCancelAdd}
              className="m-1 cursor-pointer hover:bg-gray-300"
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleAddForm}
          className="flex w-20 h-10 p-1 rounded cursor-pointer hover:bg-gray-300 select-none"
        >
          <AddIcon />
          <p>追加</p>
        </div>
      )}
    </div>
  );
};

export default AddTaskButton;

// tasksStateも修正のこと
