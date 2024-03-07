"use client";
import React, { useEffect } from "react";
import BoardCard from "./BoardCard";
import { useRecoilState, useRecoilValue } from "recoil";
import tokenState from "@/recoils/atoms/tokenState";
import axios from "axios";
import { boardsState } from "@/recoils/atoms/boardState";
import { useFetchBoardList } from "../hooks/useFetchBoardList";

const BoardList = () => {
  const [boardList, setBoadList] = useRecoilState(boardsState);
  const token = useRecoilValue(tokenState);

  useFetchBoardList(token, setBoadList);

  if (!boardList) {
    return <div>⏳loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {boardList.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
