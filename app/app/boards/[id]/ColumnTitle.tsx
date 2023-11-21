"use client";
import React, { useState } from "react";

import { ColumnType } from "@/types/board-data";
import { useSetRecoilState } from "recoil";
import { activeColumnState } from "@/recoils/atoms/boardState";

type ColumnTitleProps = {
  column: ColumnType;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};
const ColumnTitle = ({ column, isEditing, setIsEditing }: ColumnTitleProps) => {
  const [title, setTitle] = useState(column.name);
  const [newTitle, setNewTitle] = useState(title);
  const setActiveColumn = useSetRecoilState(activeColumnState);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
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
