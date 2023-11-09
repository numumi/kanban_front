"use client";
import { TaskType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useRecoilState, useRecoilValue } from "recoil";
import { modalTaskState, tasksState } from "@/recoils/boardState";

type TaskProps = {
  task: TaskType;
  cursor?: string;
  columnTitle?: string;
};

const Task = ({ task, cursor, columnTitle }: TaskProps) => {
  const tasks = useRecoilValue(tasksState);
  const [modalTask, setModalTask] = useRecoilState(modalTaskState);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseUp = () => {
    const taskDetail = tasks.find((_task) => _task.id === task.id);

    if (!taskDetail || !columnTitle) return;

    const modalTask = { task: taskDetail, columnTitle: columnTitle };
    setModalTask(modalTask);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500 ${cursor}`}
      onMouseUp={handleMouseUp}
    >
      {task.name}
    </div>
  );
};

export default Task;
