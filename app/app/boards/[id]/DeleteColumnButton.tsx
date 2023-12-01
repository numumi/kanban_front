"use client";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";
import { useRecoilState } from "recoil";
import { columnsState } from "@/recoils/atoms/boardState";
import axios from "axios";

type DeleteColumnBottonProps = {
  column: ColumnType;
};

const DeleteColumnButton = ({ column }: DeleteColumnBottonProps) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const columnId = column.id.replace("column-", "");
  const columnParams = { board_id: column.board_id };
  const handleDelete = async () => {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.PROD_API_URL}columns/${columnId}`
          : `http://localhost:3000/columns/${columnId}`;
      const response = await axios.delete(url, { params: columnParams });
      const newColumns = columns.filter((col) => col.id !== column.id);
      setColumns(newColumns);
    } catch (error) {
      console.error("削除に失敗しました。", error);
    }
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
