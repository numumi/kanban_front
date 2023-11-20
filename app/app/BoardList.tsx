"use client";
import React, { useEffect } from "react";
import BoardCard from "./BoardCard";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { fetchBoardList } from "@/recoils/selectors/fetchBoardList";

const BoardList = () => {
  const boardList = useRecoilValueLoadable(fetchBoardList);
  switch (boardList.state) {
    case "hasValue":
      return (
        <div className="grid grid-cols-2 gap-4 p-4">
          {boardList.contents.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      );
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      throw boardList.contents;
  }
};

export default BoardList;
