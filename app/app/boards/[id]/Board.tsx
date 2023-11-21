"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
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
import { ColumnType } from "@/types/board-data";
import Columns from "./Columns";
import Column from "./Column";
import { useParams } from "next/navigation";
import fetchBoardData from "@/recoils/selectors/fetchBoardData";

type CustomDragOverEvent = DragOverEvent & {
  activatorEvent: {
    clientY: number;
  };
};

const Board = () => {
  const boardId = Number(useParams().id);
  const boardDataLoadable = useRecoilValueLoadable(fetchBoardData(boardId));
  const [board, setBoard] = useRecoilState(boardState);

  const [columns, setColumns] = useRecoilState(columnsState);
  const [prevColumns, setPrevColumns] = useState<ColumnType[]>([]);
  const [activeTask, setActiveTask] = useRecoilState(activeTaskState);
  const [activeColumn, setActiveColumn] = useRecoilState(activeColumnState);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  setBoard(boardDataLoadable.contents);

  useEffect(() => {
    if (boardDataLoadable.state === "hasValue") {
      setBoard(boardDataLoadable.contents);
    }
  }, [boardId]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (board) {
      setColumns(board.columns);
    }
  }, [board]);
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

  function findColumn(taskId: string) {
    // すべてのカラムを走査する
    for (const column of columns) {
      // 各カラム内のタスクをチェックする
      for (const task of column.tasks) {
        if (task.id === taskId) {
          // タスクが見つかった場合、そのカラムを返す
          return column;
        }
      }
    }
    // タスクが見つからない場合、nullまたは適切な値を返す
    return null;
  }

  const taskReorder = (event: CustomDragOverEvent) => {
    const { active, over, delta, activatorEvent } = event;
    const id = active.id.toString();
    const overId = over?.id.toString();
    if (!overId) return;

    const activeColumn = findColumn(id);
    if (!activeColumn) return;
    const activeColumnId = activeColumn?.id;

    const overColumn = overId.startsWith("task")
      ? findColumn(overId)
      : columns.find((column) => column.id === overId);
    const overColumnId = overColumn?.id;

    if (!activeColumnId || !overColumnId || id === overId) {
      return;
    }

    // タスクのインデックスを取得します。
    const activeTaskIndex = activeColumn?.tasks.findIndex(
      (task) => task.id === id
    );
    const overTaskIndex = overColumn?.tasks.findIndex(
      (task) => task.id === overId
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

    const newTask = findTask(id);
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

  const columnReorder = (event: CustomDragOverEvent) => {
    const { active, over } = event;
    const id = active.id.toString();
    const overId = over?.id;
    if (!overId) return;
    if (id === overId) return;
    // カラムのインデックスを取得します。
    const activeIndex = active.data?.current?.sortable.index;
    const overIndex = columns.findIndex((column) => column.id === overId);

    const newColumns = [...columns];
    // ドラッグしたカラムを取り除く
    const remmoveColumn = newColumns.splice(activeIndex, 1);
    newColumns.splice(overIndex, 0, remmoveColumn[0]);
    setPrevColumns(newColumns);
  };

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    setTimeout(() => {
      console.log("handleDragStart");
      const { active } = event;
      // ドラッグしたリソースのid
      const id = active.id.toString();
      if (id.startsWith("task")) {
        const task = findTask(id);

        if (task) {
          setActiveTask(task);
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
      if (!activeTask && !activeColumn) return;

      const id = event.active.id.toString();

      // idがtaskから始まる場合、taskの移動処理
      // idがcolumnから始まる場合、columnの移動処理
      if (id.startsWith("task")) {
        taskReorder(event);
      } else if (id.startsWith("column")) {
        columnReorder(event);
      }
    }, 200);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (prevColumns.length > 0) {
      setColumns(prevColumns);
    }
    setPrevColumns([]);
    setActiveTask(undefined);
    setActiveColumn(undefined);
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
        className="p-5"
        style={{
          backgroundImage: `url(${board.image})`,
          width: "calc(100vw - var(--sidebar-width))",
          height: "calc(100vh - var(--header-height))",
          overflowX: "auto",
        }}
      >
        <Columns columns={displayColumns} setColumns={setColumns} />
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
