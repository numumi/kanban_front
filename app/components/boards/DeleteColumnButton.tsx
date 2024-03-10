"use client";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";
import { useRecoilState, useRecoilValue } from "recoil";
import { columnsState } from "@/recoils/atoms/boardState";
import axios from "axios";
import tokenState from "@/recoils/atoms/tokenState";

type DeleteColumnBottonProps = {
  column: ColumnType;
};

const DeleteColumnButton = ({ column }: DeleteColumnBottonProps) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const columnId = String(column.id).replace("column-", "");
  const columnParams = { board_id: column.board_id };
  const token = useRecoilValue(tokenState);
  const handleDelete = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}columns/${columnId}`;

      const response = await axios.delete(url, {
        params: columnParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
