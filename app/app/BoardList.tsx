"use client";
import React, { useEffect } from "react";
import BoardCard from "./BoardCard";
import { useRecoilState, useRecoilValue } from "recoil";
import tokenState from "@/recoils/atoms/tokenState";
import axios from "axios";
import { boardsState } from "@/recoils/atoms/boardState";

const BoardList = () => {
  const [boardList, setBoadList] = useRecoilState(boardsState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (!token) return;
    const fetchBoardList = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL!, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoadList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBoardList();
  }, [token]);

  if (!boardList) {
    return <div>⏳loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {boardList.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
