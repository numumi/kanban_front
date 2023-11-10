"use client";
import { useState } from "react";

import boardListData from "../../../public/data/board-list.json";

const Sidebar = () => {
  const [boardList, setBoard] = useState(boardListData);

  return (
    <div style={{width: 'var(--sidebar-width)'}} className="p-2">
      <h2>ボード一覧</h2>
      <ul style={{ padding: 0 }}>
        {boardList &&
          boardList.map((board) => (
            <li key={board.id} className="flex items-center my-10">
              <img
                src={board.image}
                alt={board.name}
                width="50"
                height="50"
                className="mr-2 rounded"
              />
              <a href={`/boards/${board.id}`}>{board.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
