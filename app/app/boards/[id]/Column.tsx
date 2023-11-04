"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ColumnType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import AddTaskBotton from "./AddTaskBotton";
import DeleteColumnButton from "./DeleteColumnButton";

type ColumnProps = {
  column: ColumnType;
  cursor?: string;
};

const Column: FC<ColumnProps> = memo(({ column, cursor }: ColumnProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { setNodeRef: setColumnRef } = useDroppable({
    id: column.id,
  });
  const tasks = column.tasks;
  return (
    <div ref={setNodeRef}>
      <SortableContext
        id={column.id}
        items={tasks}
        strategy={rectSortingStrategy}
      >
        <div>
          <div
            ref={setColumnRef}
            className={`relative w-60 p-1 m-2 bg-gray-200 rounded ${cursor}`}
            style={{ minHeight: "100px" }}
          >
            <div
              className="flex justify-between"
              {...listeners}
              {...attributes}
            >
              <ColumnTitle column={column} />
              <DeleteColumnButton column={column} />
            </div>

            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            <AddTaskBotton column={column} />
          </div>
        </div>
      </SortableContext>
    </div>
  );
});

export default Column;
