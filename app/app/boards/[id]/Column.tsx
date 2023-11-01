"use client";
import React, { FC, memo, useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ColumnType } from "@/types/board-data";

import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import AddTaskBotton from "./AddTaskBotton";
import DeleteColumnButton from "./DeleteColumnButton";

type ColumnProps = {
  column: ColumnType;
};

const Column: FC<ColumnProps> = memo(({ column }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const tasks = column.tasks;
  return (
    <SortableContext
      id={column.id}
      items={tasks}
      strategy={rectSortingStrategy}
    >
      <div>
        <div
          ref={setNodeRef}
          className="relative w-60 p-1 m-2 bg-gray-200 rounded"
          style={{ minHeight: '100px' }}
        >
          <div className="flex justify-between">
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
  );
});

export default Column;
