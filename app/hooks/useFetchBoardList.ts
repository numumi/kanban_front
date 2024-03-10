import { fetchBoardListApi } from "@/app/api/boardApi";
import { Board } from "@/types/board-list";
import { useEffect } from "react";
import { SetterOrUpdater } from "recoil";

export const useFetchBoardList = (
  token: string,
  setBoadList: SetterOrUpdater<Board[]>
) => {
  useEffect(() => {
    if (!token) return;

    const fetchBoardList = async () => {
      try {
        const response = await fetchBoardListApi(token);
        setBoadList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBoardList();
  }, [token]);
};
