"use client";
import React from "react";
import { useRecoilState } from "recoil";

import { boardState } from "@/recoils/boardState";

import AddIcon from "@mui/icons-material/Add";
import Column from "./Column";

const BoardBody = () => {
  const [board, setBoard] = useRecoilState(boardState);

  return (
    <div
      className="p-5"
      style={{ backgroundImage: `url(${board.image})`, height: "100vh" }}
    >
      <div className="flex">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
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
