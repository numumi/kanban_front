import React from "react";
import { Board } from "../types/board-list";

type BoardCardProps = {
  board: Board;
};

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <div className="bg-white border rounded p-4">
      <img
        src={board.image}
        alt={board.name}
        className="w-350 h-200 object-cover mb-2"
      />
      <h2 className="text-center text-xl font-semibold">{board.name}</h2>
    </div>
  );
};

export default BoardCard;
