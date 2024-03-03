"use client";
import Board from "../../../features/components/boards/Board";
import TaskDetailsModal from "../../../features/components/boards/TaskDetailModal";

export default function BoardPage() {
  return (
    <>
      <Board />
      <TaskDetailsModal />
    </>
  );
}
