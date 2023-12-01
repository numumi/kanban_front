import { selectorFamily } from "recoil";
import axios from "axios";
import BoardType, { ColumnType } from "@/types/board-data";

const fetchBoardData = selectorFamily<BoardType, number>({
  key: "fetchBoardData",
  get: (id) => async () => {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.PROD_API_URL}board/${id}`
          : `http://localhost:3000/board/${id}`;
      const response = await axios.get(url);
      const data = {
        ...response.data,
        columns: response.data.columns.map((column: ColumnType) => ({
          ...column,
          id: `column-${column.id}`,
          tasks: column.tasks.map((task) => ({
            ...task,
            id: `task-${task.id}`,
          })),
        })),
      };
      return data;
    } catch (error) {
      throw new Error("データの取得に失敗しました。");
    }
  },
});

export default fetchBoardData;
