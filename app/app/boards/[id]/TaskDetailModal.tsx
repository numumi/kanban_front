import React, { use } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import Modal from "../../../components/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { activeTaskState, modalTaskState } from "@/recoils/boardState";

const TaskDetailsModal = () => {
  const setActiveTask = useSetRecoilState(activeTaskState);
  const [modalTask, setModalTask] = useRecoilState(modalTaskState);
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
          <div className="bg-gray-200 p-2 rounded min-h-[8rem] cursor-pointer hover:bg-gray-300">
            <ReactMarkdown>{task.description}</ReactMarkdown>
          </div>
          {/* その他のタスクの詳細情報を表示 */}
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;

// recoilRootの中に入れる
// modalOpenをatomで作成
// modalOpenの初期値はfalse
// document.bodyにTaskDetailsModalを表示する
