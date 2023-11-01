"use client";
import React from "react";

import { TaskType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...listeners}
      {...attributes}
      className="m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500"
    >
      {task.name}
    </div>
  );
};

export default Task;
