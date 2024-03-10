import { fetchBoardDataApi } from "@/app/api/boardApi";
import { boardState, columnsState } from "@/recoils/atoms/boardState";
import BoardType, { ColumnType } from "@/types/board-data";
import axios from "axios";
import { useEffect } from "react";
import { SetterOrUpdater } from "recoil";

const useBoardData = (
  token: string | null,
  boardId: number,
  setBoard: SetterOrUpdater<BoardType>,
  setColumns: SetterOrUpdater<ColumnType[]>
) => {
  useEffect(() => {
    if (!token) return;
    const fetchBoardData = async () => {
      try {
        const response = await fetchBoardDataApi(token, boardId);

        console.log("response", response);
        // columnだけidを加工に変更する
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
        setBoard(data);
        setColumns(data.columns);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBoardData();
  }, [token, boardId]);
};

export default useBoardData;
