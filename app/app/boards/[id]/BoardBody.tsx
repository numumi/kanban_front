"use client";
import React, { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, columnsState } from "@/recoils/boardState";

import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

const BoardBody = () => {
  const board = useRecoilValue(boardState);
  const [columns, setColumns] = useRecoilState(columnsState);
  useEffect(() => {
    setColumns(columns);
  }, [columns]);

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
