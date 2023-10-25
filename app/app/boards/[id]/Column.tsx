import React from "react";

import { ColumnType } from "@/types/board-data";
import ColumnTitle from "./ColumnTitle";
import Task from "./Task";
import AddColumnBotton from "./AddColumnBotton";

type ColumnProps = {
  column: ColumnType;
};

const Column = ({ column }: ColumnProps) => {
  return (
    <div>
      <div className="relative w-60 p-1 m-2 bg-gray-200 rounded">
        <ColumnTitle column={column} />
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
        <AddColumnBotton />
      </div>
    </div>
  );
};

export default Column;
