import { ColumnType } from "@/types/board-data";
import axios from "axios";
import { SetterOrUpdater } from "recoil";

const useSaveColumnTitle = (
  newTitle: string,
  setNewTitle: React.Dispatch<React.SetStateAction<string>>,
  title: string,
  id: number,

  token: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setActiveColumn: SetterOrUpdater<ColumnType | undefined>,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const columnParams = {
    column: {
      name: newTitle,
    },
  };
  const saveColumnTitle = async () => {
    if (newTitle.trim() === "") {
      setNewTitle(title);
    } else {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}columns/${id}`;
        await axios.patch(url, columnParams, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("データの取得に失敗しました。", error);
      }
      setTitle(newTitle);
    }
    setActiveColumn(undefined);
    setIsEditing(false);
  };
  saveColumnTitle();
};
export default useSaveColumnTitle;
