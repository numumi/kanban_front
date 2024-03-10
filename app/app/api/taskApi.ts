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

export const saveReorderTask = async (
  token: string,
  taskId: string,
  taskParams: {}
) => {
  const id = parseInt(String(taskId).replace("task-", ""));
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${id}/move`;
  return await axios.put(url, taskParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTaskApi = async (token: string, newTaskParams: {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks`;
  return await axios.post(url, newTaskParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchTaskApi = async (token: string, id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${id}`;
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTaskApi = async (token: string, id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${id}`;
  return await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
