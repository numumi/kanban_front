import React from "react";
import { TaskType } from "@/types/board-data";
import Modal from "../../../components/Modal";

type TaskDetailProps = {
  task: TaskType | null; // 表示するタスク、またはモーダルが非表示の場合はnull
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  if (!task) return null; // タスクがなければ何も表示しない

  const onClose = () => {
    console.log("task details modal close");
  };
  return (
    <Modal>
      <div className="modal-content">
        <h2>タスクタイトル</h2>
        <p>タスクdescription</p>
        {/* その他のタスクの詳細情報を表示 */}
      </div>
      <button onClick={onClose}>閉じる</button>
    </Modal>
  );
};

export default TaskDetail;

// closeする時
// ルーティングをボードに戻す

// openする時
// ルーティングをボードのタスクにする
