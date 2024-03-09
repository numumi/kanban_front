import { ColumnType } from "@/types/board-data";
import axios from "axios";

export const saveReorderColumn = async (token: string, columns: ColumnType[]) => {
  const columnParams = {
    ids: columns.map((column) => String(column.id).replace("column-", "")),
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}columns/move`;

  return axios.put(url, columnParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
