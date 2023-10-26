import React from "react";

import { TaskType } from "@/types/board-data";

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  return (
    <div className="m-2 p-2 bg-white shadow-md rounded border-2 border-gray-200 hover:border-blue-500">
      {task.name}
    </div>
  );
};

export default Task;
