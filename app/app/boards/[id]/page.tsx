"use client";
import Board from "../../../components/boards/Board";
import TaskDetailsModal from "../../../components/boards/TaskDetailModal";

export default function BoardPage() {
  return (
    <>
      <Board />
      <TaskDetailsModal />
    </>
  );
}
