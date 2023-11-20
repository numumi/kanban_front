"use client";
import { useEffect, useState } from "react";
import BoardCard from "./BoardCard";

import { Board } from "../types/board-list";
import { RecoilRoot } from "recoil";

import axios from "axios";

export default function Home() {
  const [boardList, setBoardList] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setBoardList(response.data);
      } catch (error) {
        console.error("Error fetching board list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {boardList.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}
