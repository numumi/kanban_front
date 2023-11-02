"use client";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ColumnType } from "@/types/board-data";
import ClearIcon from "@mui/icons-material/Clear";
import { v4 as uuid } from "uuid";

type ColumnsProps = {
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

const AddColumnButton: React.FC<ColumnsProps> = (props) => {
  const { columns, setColumns } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const columnId = uuid();
  const handleAddForm = () => {
    setIsEditing(true);
  };
  const handleFormCancel = () => {
    setTitle("");
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const handleSave = () => {
    if (title === "") {
      setIsEditing(false);
      return;
    }
    const newColumn = {
      id: columnId,
      title: title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
    setTitle("");
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="w-60 h-20 p-2 m-2 bg-gray-200 rounded">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full"
              type="text"
              onChange={handleChange}
              onBlur={handleSave}
              maxLength={15}
              value={title}
              autoFocus
              placeholder="タイトルを入力"
            />
          </form>
          <div className="flex mt-2 mr-2">
            <button
              onClick={handleSave}
              className="p-1 bg-blue-400 rounded cursor-pointer hover:bg-blue-500 text-white"
            >
              追加
            </button>
            <button
              onClick={handleFormCancel}
              className="m-1 cursor-pointer hover:bg-gray-400"
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleAddForm}
          className="w-60 h-20 p-1 m-2 flex bg-gray-200 bg-opacity-30 rounded cursor-pointer hover:bg-gray-200"
        >
          <AddIcon />
          <p>追加</p>
        </div>
      )}
    </div>
  );
};

export default AddColumnButton;
