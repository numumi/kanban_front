import axios from "axios";

export const fetchBoardDataApi = async (token: string, boardId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/board/${boardId}`;
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchBoardListApi = async (token: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}`;
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
