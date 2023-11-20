"use client";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType, TaskType } from "@/types/board-data";
import { v4 as uuid } from "uuid";
import { columnsState, tasksState } from "@/recoils/atoms/boardState";
import { useRecoilState } from "recoil";

type ColumnProps = {
  column: ColumnType;
};
const AddTaskButton: React.FC<ColumnProps> = (props) => {
  const { column } = props;
  const [isEditing, setIsEditing] = useState(false);
  const taskId = uuid();
  const [taskInput, setTaskInput] = useState("");
  const [columns, setColumns] = useRecoilState(columnsState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const handleAddForm = () => {
    setIsEditing(true);
  };
  const handleCancelAdd = () => {
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInput(e.target.value);
  };
  const handleSubmit = () => {
    if (taskInput === "") {
      return setIsEditing(false);
    }
    const newTask: TaskType = {
      id: `task-${taskId}`,
      name: taskInput,
    };
    const newColumn = { ...column, tasks: [...column.tasks, newTask] };
    const newColumns = columns.map((column) => {
      if (column.id === newColumn.id) {
        return newColumn;
      }
      return column;
    });
    setColumns(newColumns);
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <div>
          <form className="mt-2 ml-2 mr-2">
            <textarea
              className="w-full p-1 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500"
              placeholder="タイトルを入力"
              autoFocus
              onChange={handleChange}
              onBlur={handleSubmit}
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
