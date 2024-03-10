import { findTask, findColumn } from "@/utils/boardUtil";
import { ColumnType, TaskType } from "@/types/board-data";
import { useRecoilState } from "recoil";
import { DragOverEvent } from "@dnd-kit/core";
import { columnsState } from "@/recoils/atoms/boardState";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const reorderTaskDnd = (event: CustomDragOverEvent, columns: ColumnType[]) => {
  const { active, over, delta, activatorEvent } = event;
  console.log("reorderTaskDnd")
  const id = active.id.toString();
  const overId = over?.id.toString();
  if (!overId) return;

  const activeColumn = findColumn(columns, id);
  if (!activeColumn) return;
  const activeColumnId = activeColumn?.id;

  const overColumn = overId.startsWith("task")
    ? findColumn(columns, overId)
    : columns.find((column) => column.id === overId);
  const overColumnId = overColumn?.id;

  if (!activeColumnId || !overColumnId || id === overId) {
    return;
  }

  // タスクのインデックスを取得します。
  const activeTaskIndex = activeColumn?.tasks.findIndex(
    (task: TaskType) => task.id === id
  );
  const overTaskIndex = overColumn?.tasks.findIndex(
    (task: TaskType) => task.id === overId
  );

  // ドラッグしたタスクの上面のY座標を取得
  const activeRectTop = activatorEvent?.clientY + delta.y;
  // overTaskの底面のY座標を取得
  const overRectBottom = over?.rect.bottom;
  // 移動先のカラムのドロップ位置を計算
  const newTaskIndex =
    overRectBottom &&
    activeRectTop > overRectBottom &&
    overTaskIndex === overColumn?.tasks.length - 1
      ? overTaskIndex + 1
      : overTaskIndex;

  const newTask = findTask(columns, id);
  if (!newTask) return;

  // プレビューを表示するために、新しいカラムのタスクを更新
  const newColumns = columns.map((column) => {
    if (column.id === activeColumnId && column.id == overColumnId) {
      const updatedTasks = [...column.tasks];
      updatedTasks.splice(activeTaskIndex, 1);
      updatedTasks.splice(newTaskIndex, 0, newTask);
      return {
        ...column,
        tasks: updatedTasks,
      };
    } else if (column.id === activeColumnId) {
      return {
        ...column,
        tasks: column.tasks.filter((task) => task.id !== id),
      };
    } else if (column.id === overColumnId) {
      const updatedTasks = [...column.tasks];
      updatedTasks.splice(newTaskIndex, 0, newTask);
      return {
        ...column,
        tasks: updatedTasks,
      };
    }
    return column;
  });

  const newPosition = () => {
    const updatedColumn = newColumns.find(
      (column) => column.id === overColumnId
    );
    if (!updatedColumn) return null;
    return updatedColumn.tasks.findIndex((task) => task.id === id);
  };
  const newTaskParams = {
    id: parseInt(String(id).replace("task-", "")),
    position: newPosition(),
    source_column_id: parseInt(String(activeColumnId).replace("column-", "")),
    destination_column_id: parseInt(
      String(overColumnId).replace("column-", "")
    ),
  };
  return { newColumns, newTaskParams };
};

export default reorderTaskDnd;
