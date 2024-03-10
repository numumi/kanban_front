import { ColumnType } from "@/types/board-data";
import { DragOverEvent } from "@dnd-kit/core";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const reorderColumnsDnd = (
  event: CustomDragOverEvent,
  columns: ColumnType[]
  // setColumns: (columns: ColumnType[]) => void
) => {
  console.log("reorderColumnsDnd");
  const { active, over } = event;
  const id = active.id.toString();
  const overId = over?.id;
  if (!overId) return;
  if (id === overId) return;
  // カラムのインデックスを取得します。
  const activeIndex = active.data?.current?.sortable.index;
  const overIndex = columns.findIndex((column) => column.id === overId);
  const newColumns = [...columns];
  // activeIndexのcolumnとoverIndexのcolumnを入れ替える
  [newColumns[activeIndex], newColumns[overIndex]] = [
    newColumns[overIndex],
    newColumns[activeIndex],
  ];
  return newColumns;
};

export default reorderColumnsDnd;
