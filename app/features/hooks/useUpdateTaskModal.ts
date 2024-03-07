import { TaskType } from "@/types/board-data";
import axios from "axios";
import { useState } from "react";

export const useUpdateTask = (token: string, taskParams: TaskType) => {
  const updateTask = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}tasks/${taskParams.id}`;
      await axios.patch(url, taskParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("データの取得に失敗しました。", error);
      // フラッシュでエラーを表示
    }
  };
  updateTask
};
