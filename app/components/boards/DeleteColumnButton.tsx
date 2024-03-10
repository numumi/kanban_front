"use client";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";
import { useRecoilState, useRecoilValue } from "recoil";
import { columnsState } from "@/recoils/atoms/boardState";
import tokenState from "@/recoils/atoms/tokenState";
import { deleteColumnApi } from "@/app/api/columnApi";

type DeleteColumnBottonProps = {
  column: ColumnType;
};

const DeleteColumnButton = ({ column }: DeleteColumnBottonProps) => {
  const [columns, setColumns] = useRecoilState(columnsState);
  const columnId = parseInt(String(column.id).replace("column-", ""));
  const token = useRecoilValue(tokenState);
  const handleDelete = async () => {
    try {
      const response = await deleteColumnApi(token, columnId);
      console.log("response", response);
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
