"use client";
import React from "react";
import { useRecoilState } from "recoil";

import { boardState } from "@/recoils/boardState";

import AddIcon from "@mui/icons-material/Add";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

const BoardBody = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [columns, setColumns] = React.useState(board.columns);

  return (
    <div
      className="p-5"
      style={{ backgroundImage: `url(${board.image})`, height: "100vh" }}
    >
      <div className="flex">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddColumnButton columns={columns} setColumns={setColumns} />
      </div>
    </div>
  );
};

export default BoardBody;
