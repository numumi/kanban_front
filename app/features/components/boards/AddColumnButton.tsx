"use client";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ColumnType } from "@/types/board-data";
import ClearIcon from "@mui/icons-material/Clear";

import axios from "axios";
import { useRecoilValue } from "recoil";
import tokenState from "@/recoils/atoms/tokenState";

type ColumnsProps = {
  boardId: number;
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

const AddColumnButton: React.FC<ColumnsProps> = (props) => {
  const { columns, setColumns, boardId } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const token = useRecoilValue(tokenState);
  const handleAddForm = () => {
    setIsEditing(true);
  };
  const handleFormCancel = () => {
    setName("");
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const handleSave = async () => {
    if (name === "") {
      setIsEditing(false);
      return;
    }
    const newColumnParams = {
      column: {
        name: name,
        board_id: boardId,
      },
    };
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}columns`;
      const response = await axios.post(url, newColumnParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newColumn = {
        id: `column-${response.data.id}`,
        name: name,
        board_id: boardId,
        tasks: [],
      };
      setColumns([...columns, newColumn]);
      setName("");
      setIsEditing(false);
    } catch (error) {
      console.error("データの送信に失敗しました。", error);
      setName("");
      setIsEditing(false);
    }
  };

  return (
    <div data-testid="addColumn">
      {isEditing ? (
        <div className="w-60 h-20 p-2 m-2 bg-gray-200 rounded">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full"
              type="text"
              onChange={handleChange}
              maxLength={15}
              value={name}
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
