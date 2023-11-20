import React, { use, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import Modal from "../../../components/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import {
  activeTaskState,
  modalTaskState,
  tasksState,
} from "@/recoils/atoms/boardState";

const TaskDetailsModal = () => {
  const setActiveTask = useSetRecoilState(activeTaskState);
  const [isEditing, setIsEditing] = useState(false);
  const [modalTask, setModalTask] = useRecoilState(modalTaskState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  if (!modalTask) return null;

  const task = modalTask.task;
  const columnTitle = modalTask.columnTitle;
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

  const onClose = () => {
    setActiveTask(undefined);
    setModalTask(undefined);
  };

  const handleDescriptionClick = () => {
    setIsEditing(true); // 説明をクリックしたら編集モードに切り替える
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updateTask = { ...modalTask.task, description: e.target.value };
    setModalTask({
      ...modalTask,
      task: updateTask,
    });
    const updatedTasks: any = tasks.map((task) => {
      if (task.id === modalTask.task.id) {
        return updateTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleDescriptionBlur = () => {
    setIsEditing(false); // フォームからフォーカスが外れたら編集モードを終了する
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
          <h2 className="font-bold">{task.name}</h2>
          <div className="text-sm text-gray-500 mb-2">{columnTitle}</div>
          <div className=" cursor-pointer" onClick={handleDescriptionClick}>
            {isEditing ? (
              <div className="w-full h-full bg-white border-gray-200 hover:border-blue-500">
                <textarea
                  className="bg-white w-full h-full p-2 min-h-[8rem] border-none overflow-hidden"
                  value={task.description}
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
