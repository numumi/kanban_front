"use client";
import React, { useState } from "react";
import boardData from "../../../public/data/board-data.json";
import { useRecoilState } from "recoil";
import BoardType from "../../../types/board-data";
import { boardState } from "@/app/atoms/boardState";

type BoardProps = {
  id: number;
};
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

const BoardBody = () => {
  const [board, setBoard] = useState(boardData);
  console.log(board.image);
  return (
    <div
      className="p-5"
      style={{ backgroundImage: `url(${board.image})`, height: "100vh" }}
    >
      <div className="flex">
        {board.columns.map((column) => (
          <div
            key={column.id}
            className="relative w-60 p-1 m-2 bg-gray-200 rounded"
          >
            <div className="flex">
              <h1 className="w-full p-1 cursor-pointer">{column.title}</h1>
              <ClearIcon className="cursor-pointer hover:bg-gray-400" />
            </div>
            {column.tasks.length === 0 && <p>No tasks</p>}
            <div className="m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500">
              この中にタスク
            </div>
            <div className="m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500">
              この中にタスク
            </div>
            <div className="m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500">
              この中にタスク
            </div>
            <div className="flex w-20 h-10 p-1 rounded cursor-pointer hover:bg-gray-400">
              <AddIcon />
              <p>追加</p>
            </div>
          </div>
        ))}
        <div className="flex w-60 h-20 p-1 m-2 bg-gray-200 rounded bg-opacity-30 hover:bg-gray-200 cursor-pointer">
          <AddIcon />
          <p>追加</p>
        </div>
      </div>
    </div>
  );
};

export default BoardBody;
