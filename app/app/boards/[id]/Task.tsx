"use client";
import React, { useEffect } from "react";

import { TaskType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";

type TaskProps = {
  task: TaskType;
  cursor?: string;
};

const Task = ({ task, cursor }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseUp = () => {
    console.log("mouse up");
  };

  return (
    <Link href={`/tasks/${task.id}`}>
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
    </Link>
  );
};

export default Task;
