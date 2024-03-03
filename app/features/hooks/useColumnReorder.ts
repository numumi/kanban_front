import { ColumnType } from "@/types/board-data";
import { useSetRecoilState } from "recoil";
import { DragOverEvent } from "@dnd-kit/core";
import { columnsState } from "@/recoils/atoms/boardState";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const useColumnReorder = (
  event: CustomDragOverEvent,
  columns: ColumnType[],
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("event", event);
  console.log("columns", columns);
  console.log("setIsDragging", setIsDragging);
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
  setIsDragging(true);
  setColumns(newColumns);
};

export default useColumnReorder;
