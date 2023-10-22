"use client"
import { useState } from "react";
import BoardCard from "./boardCard";

import boardListData from "../public/data/board-list.json";

import { Board } from "../types/board-list";

export default function Home() {
  const [boardList, setBoardList] = useState<Board[]>(boardListData);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {boardList.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
