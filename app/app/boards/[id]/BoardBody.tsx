"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardState, columnsState } from "@/recoils/boardState";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";

import Column from "./Column";
import AddColumnButton from "./AddColumnButton";
import Task from "./Task";
import { ColumnType, TaskType } from "@/types/board-data";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const BoardBody = () => {
  const board = useRecoilValue(boardState);
  const [columns, setColumns] = useRecoilState(columnsState);
  const [prevColumns, setPrevColumns] = useState<ColumnType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType>();

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  useEffect(() => {
    setColumns(columns);
  }, [columns]);
  const displayColumns = prevColumns.length > 0 ? prevColumns : columns;

  // 特定のtaskIdを持つタスクを検索する関数:
  const findTask = (taskId: string) => {
    // すべてのカラムを走査する
    for (const column of columns) {
      // 各カラム内のタスクをチェックする
      for (const task of column.tasks) {
        if (task.id === taskId) {
          // タスクが見つかった場合、それを返す
          return task;
        }
      }
    }
    // タスクが見つからない場合、nullまたは適切な値を返す
    return null;
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // ドラッグしたリソースのid
    const id = active.id.toString();
    const task = findTask(id);
    if (!task) return;
    setActiveTask(task);
  };

  const handleDragOver = (event: CustomDragOverEvent) => {
    const { active, over, delta, activatorEvent } = event;
    const id = active.id.toString();
    const overId = over?.id;
    if (!overId) return;
    const activeColumnId = active?.data.current?.sortable.containerId;
    const overColumnId = over?.data.current
      ? over.data.current.sortable.containerId
      : overId;

    if (!activeColumnId || !overColumnId || id === overId) {
      return;
    }
    const overColumn = columns.find((column) => column.id === overColumnId);
    if (!overColumn) return;

    // タスクのインデックスを取得します。
    const activeTaskIndex = active.data?.current?.sortable.index;
    const overTaskIndex = over?.data?.current?.sortable.index;

    // ドラッグしたタスクの上面のY座標を取得
    const activeRectTop = activatorEvent?.clientY + delta.y;
    // overTaskの底面のY座標を取得
    const overRectBottom = over?.rect.bottom;
    // 移動先のカラムのドロップ位置を計算
    const newTaskIndex =
      activeRectTop > overRectBottom &&
      overTaskIndex === overColumn.tasks.length - 1
        ? overTaskIndex + 1
        : overTaskIndex;

    const newTask = activeTask;
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

    setPrevColumns(newColumns);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setPrevColumns([]);
    setColumns(prevColumns);
    setActiveTask(undefined);
  };

  return (
    <DndContext
      id={"board"}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className="p-5"
        style={{ backgroundImage: `url(${board.image})`, height: "100vh" }}
      >
        <div className="flex">
          {displayColumns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <AddColumnButton columns={columns} setColumns={setColumns} />
        </div>
      </div>
      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardBody;
