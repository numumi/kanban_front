import { ColumnType } from "@/types/board-data";
import axios from "axios";

export const saveReorderColumn = async (
  token: string,
  columns: ColumnType[]
) => {
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

export const saveColumnTitle = async (
  token: string,
  id: number,

  newTitle: string
) => {
  const columnParams = {
    column: {
      name: newTitle,
    },
  };
  const url = `${process.env.NEXT_PUBLIC_API_URL}columns/${id}`;
  return await axios.patch(url, columnParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createColumnApi = async (token: string, newColumnParams: {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}columns`;
  return await axios.post(url, newColumnParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const deleteColumnApi = async (token: string, id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}columns/${id}`;
  return await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
