import { selectorFamily } from "recoil";
import axios from "axios";
import BoardType from "@/types/board-data";

const fetchBoardData = selectorFamily<BoardType, number>({
  key: "fetchBoardData",
  get: (id) => async () => {
    try {
      const url = `http://localhost:3000/board/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("データの取得に失敗しました。");
    }
  },
});

export default fetchBoardData;
