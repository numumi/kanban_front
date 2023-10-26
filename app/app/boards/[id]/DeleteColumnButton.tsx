"use client";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";
import { useRecoilState } from "recoil";
import { columnsState } from "@/recoils/boardState";

type DeleteColumnBottonProps = {
  column: ColumnType;
};

const DeleteColumnButton = ({ column }: DeleteColumnBottonProps) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const handleDelete = () => {
    const newColumns = columns.filter((col) => col.id !== column.id);
    setColumns(newColumns);
  };
  return (
    <div onClick={handleDelete}>
      <ClearIcon className="cursor-pointer hover:bg-gray-400" />
    </div>
  );
};

export default DeleteColumnButton;
