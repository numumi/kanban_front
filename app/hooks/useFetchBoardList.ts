import { Board } from "@/types/board-list";
import axios from "axios";
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
};
