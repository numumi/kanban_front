import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnType } from "@/types/board-data";

type ColumnTitleProps = {
  column: ColumnType;
};
const ColumnTitle = ({ column }: ColumnTitleProps) => {
  return (
    <div className="flex">
      <h1 className="w-full p-1 cursor-pointer">{column.title}</h1>
      <ClearIcon className="cursor-pointer hover:bg-gray-400" />
    </div>
  );
};

export default ColumnTitle;
