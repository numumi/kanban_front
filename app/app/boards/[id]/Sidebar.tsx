"use client";
import { useState } from "react";

import boardListData from "../../../public/data/board-list.json";
import Link from "next/link";

const Sidebar = () => {
  const boardList = boardListData;

  return (
    <div style={{ width: "var(--sidebar-width)" }} className="p-2">
      <h2>ボード一覧</h2>
      <ul style={{ padding: 0 }}>
        {boardList &&
          boardList.map((board) => (
            <Link key={board.id} href={`/boards/${board.id}`}>
              <li  className="flex items-center my-10">
                <img
                  src={board.image}
                  alt={board.name}
                  width="50"
                  height="50"
                  className="mr-2 rounded"
                />
                <p>{board.name}</p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
