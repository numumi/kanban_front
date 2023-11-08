"use client";
import { useState } from "react";
import BoardCard from "./BoardCard";

import boardListData from "../public/data/board-list.json";

import { Board } from "../types/board-list";
import { RecoilRoot } from "recoil";

export default function Home() {
  const [boardList, setBoardList] = useState<Board[]>(boardListData);

  return (

      <div className="grid grid-cols-2 gap-4 p-4">
        {boardList.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
  );
}
