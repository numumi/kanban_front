"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ColumnType } from "@/types/board-data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import AddTaskButton from "./AddTaskButton";
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
  const [isEditing, setIsEditing] = useState(false);
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
            className={`relative w-60 p-1 m-2 bg-gray-200 rounded`}
            style={{ minHeight: "100px" }}
          >
            <div className="flex justify-between group">
              <ColumnTitle
                column={column}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              {!isEditing && <DeleteColumnButton column={column} />}

              <div
                {...listeners}
                {...attributes}
                className={`flex justify-center p-2 items-center   hover:bg-gray-300 ${cursor}`}
                
              >
                <svg viewBox="0 0 20 20" width="12">
                  <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                </svg>
              </div>
            </div>

            {tasks.map((task) => (
              <Task key={task.id} task={task} columnTitle={column.title} />
            ))}
            <AddTaskButton column={column} />
          </div>
        </div>
      </SortableContext>
    </div>
  );
});

export default Column;
Column.displayName = "Column";