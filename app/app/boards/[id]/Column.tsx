"use client";
import React, { FC, memo, useState } from "react";

import { ColumnType } from "@/types/board-data";
import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import AddTaskBotton from "./AddTaskBotton";
import DeleteColumnButton from "./DeleteColumnButton";

type ColumnProps = {
  column: ColumnType;
};

const Column: FC<ColumnProps> = memo(({ column }: ColumnProps) => {
  const [tasks, setTasks] = useState(column.tasks);
  return (
    <div>
      <div className="relative w-60 p-1 m-2 bg-gray-200 rounded">
        <div className="flex justify-between">
          <ColumnTitle column={column} />
          <DeleteColumnButton column={column} />
        </div>

        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <AddTaskBotton tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
});

export default Column;
