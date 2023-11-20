import { selector } from "recoil";
import axios from "axios";
import { Board } from "@/types/board-list";

export const fetchBoardList = selector<Board[]>({
  key: "FetchBoardList",
  get: async () => {
    const url = "http://localhost:3000/";
    const response = await axios.get(url);
    return response.data;
  },
});
