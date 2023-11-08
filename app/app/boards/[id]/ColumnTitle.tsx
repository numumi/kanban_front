"use client";
import React, { useState, useRef } from "react";

import { ColumnType } from "@/types/board-data";
import { useSetRecoilState } from "recoil";
import { activeColumnState } from "@/recoils/boardState";

type ColumnTitleProps = {
  column: ColumnType;
};
const ColumnTitle = ({ column }: ColumnTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newTitle, setNewTitle] = useState(title);
  const setActiveColumn = useSetRecoilState(activeColumnState);

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

  const handleSave = () => {
    if (newTitle.trim() === "") {
      setNewTitle(title);
    } else {
      setTitle(newTitle);
      // colimn tittle updateのリクエストを送る
    }
    setActiveColumn(undefined);
    setIsEditing(false);
  };

  return (
    <div className="ml-2 w-full p-1 cursor-pointer">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            onBlur={handleSave}
            maxLength={10}
            value={newTitle}
            autoFocus
          />
        </form>
      ) : (
        <h1 onMouseUp={handleTitleClick} className="select-none">
          {title}
        </h1>
      )}
    </div>
  );
};

export default ColumnTitle;
