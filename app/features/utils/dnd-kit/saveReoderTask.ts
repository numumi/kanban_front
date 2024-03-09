import { TaskType } from "@/types/board-data";
import axios from "axios";

// 移動してもtask_idが変わらないようになったので要改修

export const saveReorderTask = async (
  token: string,
  taskId: string,
  taskParams: {}
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${taskId}/move`;
  return await axios.put(url, taskParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
