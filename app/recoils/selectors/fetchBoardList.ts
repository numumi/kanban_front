import { selector } from "recoil";
import axios from "axios";
import { Board } from "@/types/board-list";

export const fetchBoardList = selector<Board[]>({
  key: "FetchBoardList",
  get: async () => {
    const url =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : "http://localhost:3000/";
    if (!url) throw new Error("API URLが設定されていません");
    const response = await axios.get(url);
    return response.data;
  },
});
