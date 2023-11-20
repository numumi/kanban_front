"use client";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";
import { useRecoilState } from "recoil";
import { columnsState } from "@/recoils/atoms/boardState";

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
    <div
      onClick={handleDelete}
      className="opacity-0 group-hover:opacity-100 items-center justify-center"
    >
      <ClearIcon
        className="cursor-pointer hover:bg-gray-300 "
        fontSize="small"
      />
    </div>
  );
};

export default DeleteColumnButton;
