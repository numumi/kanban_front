import React, { use, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Modal from "../../../components/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import {
  activeTaskState,
  columnsState,
  modalTaskState,
} from "@/recoils/atoms/boardState";
import { TaskType } from "@/types/board-data";
import tokenState from "@/recoils/atoms/tokenState";
import { updateTaskApi } from "@/features/utils/updateTaskApi";
import { updateTaskInColumns } from "@/features/utils/boardUtil";

const TaskDetailsModal = () => {
  const setActiveTask = useSetRecoilState(activeTaskState);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [updateTask, setUpdateTask] = useState<TaskType | undefined>(undefined);
  const [modalTaskData, setModalTaskData] = useRecoilState(modalTaskState);
  const [columns, setColumns] = useRecoilState(columnsState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (modalTaskData) {
      setUpdateTask({
        id: `${modalTaskData.task?.id}`,
        name: modalTaskData.task.name,
        description: modalTaskData.task.description,
      });
    }
  }, [modalTaskData]);

  if (!updateTask || !modalTaskData) return null;
  const task = {
    id: modalTaskData.task.id,
    name: modalTaskData.task.name,
    description: modalTaskData.task.description,
  };
  const columnTitle = modalTaskData.column.name;
  const modalContentStyle: { [key: string]: number | string } = {
    position: "relative",
    zIndex: 10,
    boxSizing: "border-box",
    width: "70vw",
    maxWidth: "700px",
    maxHeight: "80vh",
    padding: "20px",
    overflowY: "auto",
    borderRadius: "10px",
    animation: "anim-modal 0.5s ease",
    willChange: "transform, opacity",
    marginTop: "70px",
    marginBottom: "70px",
  };
  const taskParams = {
    id: String(updateTask.id).replace("task-", ""),
    name: updateTask.name,
    description: updateTask.description,
    column_id: String(modalTaskData.column.id).replace("column-", ""),
  };

  const onClose = () => {
    setActiveTask(undefined);
    setModalTaskData(undefined);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTask({
      ...updateTask,
      name: e.target.value,
    });
  };

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTask.name.trim() === "") {
      setUpdateTask(task);
      setIsEditingTitle(false);
      return;
    }
    handleSave();
  };

  const handleTitleBlur = () => {
    if (updateTask.name.trim() === "") {
      setUpdateTask(task);
      setIsEditingTitle(false);
      return;
    }
    handleSave();
  };

  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateTask({
      ...updateTask,
      description: e.target.value,
    });
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleDescriptionBlur = () => {
    if (updateTask.description?.trim() === "") {
      setUpdateTask(task);
      setIsEditingDescription(false);
      return;
    }
    handleSave();
  };

  // 要リファクタリング
  const handleSave = async () => {
    try {
      console.log("taskParams_beforeModalSave", taskParams);
      const response = await updateTaskApi(token, taskParams);
      console.log("response_modal", response);
      setModalTaskData({
        ...modalTaskData,
        task: updateTask,
      });
      setColumns(
        updateTaskInColumns(columns, updateTask, modalTaskData.column.id)
      );
    } catch (error) {
      console.error("データの更新に失敗しました。", error);
    }

    setIsEditingTitle(false);
  };

  return (
    <Modal onClose={onClose}>
      <div className="h-0">
        <div style={modalContentStyle} className="modal-content bg-gray-100">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={onClose}
          >
            <ClearIcon className="cursor-pointer cursor-pointer hover:bg-gray-300" />
          </div>

          <div>
            {isEditingTitle ? (
              <form onSubmit={handleTitleSubmit}>
                <input
                  type="text"
                  value={updateTask.name}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  autoFocus
                />
              </form>
            ) : (
              <h2 className="font-bold" onClick={handleTitleClick}>
                {task.name}
              </h2>
            )}
          </div>
          <div className="text-sm text-gray-500 mb-2">{columnTitle}</div>
          <div className=" cursor-pointer" onClick={handleDescriptionClick}>
            {isEditingDescription ? (
              <div className="w-full h-full bg-white border-gray-200 hover:border-blue-500">
                <textarea
                  className="bg-white w-full h-full p-2 min-h-[8rem] border-none overflow-hidden"
                  value={updateTask.description}
                  onChange={handleDescriptionChange}
                  onBlur={handleDescriptionBlur}
                  style={{ height: "auto" }}
                  autoFocus
                />
              </div>
            ) : (
              <div className="bg-gray-200 rounded  p-2 min-h-[8rem] hover:bg-gray-300 whitespace-pre-wrap">
                {task.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
