import React, { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ColumnType } from "@/types/board-data";
import Column from "./Column";
import AddColumnButton from "./AddColumnButton";

type ColumnsProps = {
  boardId: number;
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

const Columns: FC<ColumnsProps> = (props) => {
  const { boardId, columns, setColumns } = props;
  const { setNodeRef } = useDroppable({
    id: "board",
  });
  console.log("columns", columns);
  return (
    <SortableContext
      id="board"
      items={columns}
      strategy={horizontalListSortingStrategy}
    >
      <div
        className="flex"
        data-testid="columns"
        style={{ minHeight: "100px" }}
        ref={setNodeRef}
      >
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <AddColumnButton columns={columns} setColumns={setColumns} boardId={boardId} />
      </div>
    </SortableContext>
  );
};

export default Columns;
