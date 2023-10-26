"use client";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { TaskType } from "@/types/board-data";
import { v4 as uuid } from "uuid";

type ColumnProps = {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
};
const AddTaskBotton: React.FC<ColumnProps> = (props) => {
  const { tasks, setTasks } = props;
  const [isEditing, setIsEditing] = useState(false);
  const taskId = uuid();
  const [taskInput, setTaskInput] = useState("");
  const handleAddForm = () => {
    setIsEditing(true);
  };
  const handleCancelAdd = () => {
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInput(e.target.value);
    console.log("taskInput");
    console.log(taskInput);
  };
  const handleSubmit = () => {
    if (taskInput === "") {
      return;
    }
    const newTask = {
      id: taskId,
      name: taskInput,
    };
    setTasks([...tasks, newTask]);
    console.log(tasks);
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
              className="p-1 bg-blue-400 rounded cursor-pointer hover:bg-blue-500 text-white"
            >
              追加
            </button>
            <button
              onClick={handleCancelAdd}
              className="m-1 cursor-pointer hover:bg-gray-400"
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleAddForm}
          className="flex w-20 h-10 p-1 rounded cursor-pointer hover:bg-gray-400 select-none"
        >
          <AddIcon />
          <p>追加</p>
        </div>
      )}
    </div>
  );
};

export default AddTaskBotton;
