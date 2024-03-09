import { TaskType } from "@/types/board-data";
import axios from "axios";

export const updateTaskApi = async (token: string, taskParams: TaskType) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${taskParams.id}`;
  return axios.patch(url, taskParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
