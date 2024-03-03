import { columnsState } from "@/recoils/atoms/boardState";
import { ColumnType } from "@/types/board-data";
import axios from "axios";
import { useRecoilValue } from "recoil";

const useSaveReorderColumn = (token: string, columns: ColumnType[]) => {
  const saveReorderColumn = async () => {
    const columnParams = {
      ids: columns.map((column) => String(column.id).replace("column-", "")),
    };
    console.log("columnParams", columnParams, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}columns/move`;

      const response = await axios.put(url, columnParams);
      console.log("response", response);
    } catch (error) {
      console.error("データの取得に失敗しました。", error);
    }
  };
  saveReorderColumn();
};

export default useSaveReorderColumn;
