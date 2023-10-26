"use client";
import React, { useState } from "react";

import { ColumnType } from "@/types/board-data";
import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import ClearIcon from "@mui/icons-material/Clear";
import AddTaskBotton from "./AddTaskBotton";

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  const [tasks, setTasks] = useState(column.tasks);
  return (
    <div>
      <div className="relative w-60 p-1 m-2 bg-gray-200 rounded">
        <div className="flex justify-between">
          <ColumnTitle column={column} />
          <ClearIcon className="cursor-pointer hover:bg-gray-400" />
        </div>

        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <AddTaskBotton column={column} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Column;
