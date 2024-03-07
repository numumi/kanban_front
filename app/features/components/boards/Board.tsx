"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  activeColumnState,
  activeTaskState,
  boardState,
  columnsState,
} from "@/recoils/atoms/boardState";
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

import Task from "./Task";
import Columns from "./Columns";
import Column from "./Column";
import { useParams } from "next/navigation";
import axios from "axios";
import tokenState from "@/recoils/atoms/tokenState";
import useBoardData from "@/features/hooks/useBoardData";
import { findTask, findColumn } from "@/features/utils/boardUtil";
import useSaveReorderTask from "@/features/hooks/useSaveReoderTask";
import useSaveReorderColumn from "@/features/hooks/useSaveReoderColumn";
import useColumnReorder from "@/features/hooks/useColumnReorder";
import useTaskReorder from "@/features/hooks/useTaskReorder";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const Board = () => {
  const boardId = Number(useParams().id);
  const [board, setBoard] = useRecoilState(boardState);
  const [columns, setColumns] = useRecoilState(columnsState);
  const [activeTask, setActiveTask] = useRecoilState(activeTaskState);
  const [activeColumn, setActiveColumn] = useRecoilState(activeColumnState);
  const [isDragging, setIsDragging] = useState(false);
  const [taskParams, setTaskParams] = useState({});
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const token = useRecoilValue(tokenState);

  // ボード情報を取得する
  useBoardData(token, boardId, setBoard, setColumns);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  // const taskReorder = (event: CustomDragOverEvent) => {
  //   const { active, over, delta, activatorEvent } = event;
  //   const id = active.id.toString();
  //   const overId = over?.id.toString();
  //   if (!overId) return;

  //   const activeColumn = findColumn(columns, id);
  //   if (!activeColumn) return;
  //   const activeColumnId = activeColumn?.id;

  //   const overColumn = overId.startsWith("task")
  //     ? findColumn(columns, overId)
  //     : columns.find((column) => column.id === overId);
  //   const overColumnId = overColumn?.id;

  //   if (!activeColumnId || !overColumnId || id === overId) {
  //     return;
  //   }

  //   // タスクのインデックスを取得します。
  //   const activeTaskIndex = activeColumn?.tasks.findIndex(
  //     (task) => task.id === id
  //   );
  //   const overTaskIndex = overColumn?.tasks.findIndex(
  //     (task) => task.id === overId
  //   );

  //   // ドラッグしたタスクの上面のY座標を取得
  //   const activeRectTop = activatorEvent?.clientY + delta.y;
  //   // overTaskの底面のY座標を取得
  //   const overRectBottom = over?.rect.bottom;
  //   // 移動先のカラムのドロップ位置を計算
  //   const newTaskIndex =
  //     overRectBottom &&
  //     activeRectTop > overRectBottom &&
  //     overTaskIndex === overColumn?.tasks.length - 1
  //       ? overTaskIndex + 1
  //       : overTaskIndex;

  //   const newTask = findTask(columns, id);
  //   if (!newTask) return;

  //   // プレビューを表示するために、新しいカラムのタスクを更新
  //   const newColumns = columns.map((column) => {
  //     if (column.id === activeColumnId && column.id == overColumnId) {
  //       const updatedTasks = [...column.tasks];
  //       updatedTasks.splice(activeTaskIndex, 1);
  //       updatedTasks.splice(newTaskIndex, 0, newTask);
  //       return {
  //         ...column,
  //         tasks: updatedTasks,
  //       };
  //     } else if (column.id === activeColumnId) {
  //       return {
  //         ...column,
  //         tasks: column.tasks.filter((task) => task.id !== id),
  //       };
  //     } else if (column.id === overColumnId) {
  //       const updatedTasks = [...column.tasks];
  //       updatedTasks.splice(newTaskIndex, 0, newTask);
  //       return {
  //         ...column,
  //         tasks: updatedTasks,
  //       };
  //     }
  //     return column;
  //   });

  //   const newPosition = () => {
  //     const updatedColumn = newColumns.find(
  //       (column) => column.id === overColumnId
  //     );
  //     if (!updatedColumn) return null;
  //     return updatedColumn.tasks.findIndex((task) => task.id === id);
  //   };
  //   setIsDragging(true);
  //   setTaskParams({
  //     id: parseInt(String(id).replace("task-", "")),
  //     position: newPosition(),
  //     source_column_id: parseInt(String(activeColumnId).replace("column-", "")),
  //     destination_column_id: parseInt(
  //       String(overColumnId).replace("column-", "")
  //     ),
  //   });
  //   setColumns(newColumns);
  // };

  // const columnReorder = (event: CustomDragOverEvent) => {
  //   const { active, over } = event;
  //   const id = active.id.toString();
  //   const overId = over?.id;
  //   if (!overId) return;
  //   if (id === overId) return;
  //   // カラムのインデックスを取得します。
  //   const activeIndex = active.data?.current?.sortable.index;
  //   const overIndex = columns.findIndex((column) => column.id === overId);

  //   const newColumns = [...columns];
  //   // activeIndexのcolumnとoverIndexのcolumnを入れ替える
  //   [newColumns[activeIndex], newColumns[overIndex]] = [
  //     newColumns[overIndex],
  //     newColumns[activeIndex],
  //   ];
  //   setIsDragging(true);
  //   setColumns(newColumns);
  // };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    setTimeout(() => {
      const { active } = event;
      // ドラッグしたリソースのid
      const id = active.id.toString();
      if (id.startsWith("task")) {
        const task = findTask(columns, id);

        if (task) {
          setActiveTask(task);
          console.log("activeTask1", activeTask);
        }
      } else if (id.startsWith("column")) {
        const column = columns.find((column) => column.id === id);
        if (column) {
          setActiveColumn(column);
        }
      }
    }, 200);
  };

  const handleDragOver = (event: CustomDragOverEvent) => {
    setTimeout(() => {
      console.log("handleDragOver");
      if (!activeTask && !activeColumn) return;

      const id = event.active.id.toString();

      // idがtaskから始まる場合、taskの移動処理
      // idがcolumnから始まる場合、columnの移動処理
      if (id.startsWith("task")) {
        useTaskReorder(
          event,
          columns,
          setColumns,
          setIsDragging,
          setTaskParams
        );
      } else if (id.startsWith("column")) {
        useColumnReorder(event, columns, setColumns, setIsDragging);
      }
    }, 200);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isDragging) return;
    if (activeTask) {
      useSaveReorderTask(token, activeTask, taskParams, columns, setColumns);
      setActiveTask(undefined);
    } else if (activeColumn) {
      useSaveReorderColumn(token, columns);
      setActiveColumn(undefined);
    }
    setIsDragging(false);
  };

  if (!board || !columns) return <div>Loading...</div>;

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
        data-testid="boardBody"
        className="p-5"
        style={{
          backgroundImage: `url(${board.image})`,
          width: "100vw",
          height: "calc(100vh - var(--header-height))",
          overflowX: "auto",
        }}
      >
        <Columns columns={columns} setColumns={setColumns} boardId={boardId} />
      </div>
      {activeTask || activeColumn ? (
        <DragOverlay>
          {activeTask && <Task task={activeTask} cursor="cursor-grabbing" />}
          {activeColumn && (
            <Column column={activeColumn} cursor="cursor-grabbing" />
          )}
        </DragOverlay>
      ) : null}
    </DndContext>
  );
};

export default Board;
