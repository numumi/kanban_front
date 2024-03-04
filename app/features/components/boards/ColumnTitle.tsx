"use client";
import React, { useState } from "react";

import { ColumnType } from "@/types/board-data";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { activeColumnState } from "@/recoils/atoms/boardState";
import axios from "axios";
import tokenState from "@/recoils/atoms/tokenState";

type ColumnTitleProps = {
  column: ColumnType;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
const ColumnTitle = ({ column, isEditing, setIsEditing }: ColumnTitleProps) => {
  const [title, setTitle] = useState(column.name);
  const [newTitle, setNewTitle] = useState(title);
  const setActiveColumn = useSetRecoilState(activeColumnState);
  const token = useRecoilValue(tokenState);
  const id = parseInt(String(column.id).replace("column-", ""))

  const columnParams = {
    column: {
      name: newTitle,
    },
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  const handleSave = async () => {
    if (newTitle.trim() === "") {
      setNewTitle(title);
    } else {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}columns/${id}`;
        await axios.patch(url, columnParams, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("データの取得に失敗しました。", error);
      }
      setTitle(newTitle);
    }
    setActiveColumn(undefined);
    setIsEditing(false);
  };

  return (
    <div className="ml-2 pt-1 w-full cursor-pointer">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            className="pl-1"
            type="text"
            onChange={handleChange}
            onBlur={handleSave}
            maxLength={10}
            value={newTitle}
            autoFocus
          />
        </form>
      ) : (
        <h1 onMouseUp={handleTitleClick} className="select-none pl-1">
          {title}
        </h1>
      )}
    </div>
  );
};

export default ColumnTitle;