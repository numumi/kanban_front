"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
  DragStartEvent,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";

import Task from "./Task";
import Columns from "./Columns";
import Column from "./Column";
import { useParams } from "next/navigation";
import tokenState from "@/recoils/atoms/tokenState";
import useBoardData from "@/hooks/useBoardData";
import { findTask } from "@/utils/boardUtil";
import reorderTaskDnd from "@/utils/dnd-kit/reorderTaskDnd";
import reorderColumnsDnd from "@/utils/dnd-kit/reorderColumnsDnd";
import { saveReorderColumn } from "@/app/api/saveReoderColumn";
import { saveReorderTask } from "@/app/api/saveReoderTask";

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
        const reorderResult = reorderTaskDnd(event, columns);
        if (!reorderResult) return;
        const { newColumns, newTaskParams } = reorderResult;
        setColumns(newColumns);
        setTaskParams(newTaskParams);
        console.log("newTaskParams", taskParams);
        console.log("newColumns", columns);
        setIsDragging(true);
      } else if (id.startsWith("column")) {
        const newColumns = reorderColumnsDnd(event, columns);
        if (!newColumns) return;
        setColumns(newColumns);
        setIsDragging(true);
      }
    }, 200);
  };

  const handleDragEnd = async () => {
    if (!isDragging) return;
    if (activeTask) {
      try {
        const response = await saveReorderTask(
          token,
          activeTask.id,
          taskParams
        );
        console.log("response", response);
      } catch (error) {
        console.error("データの取得に失敗しました。", error);
        //エラーメッセージをセットしてフラッシュを表示 後で実装
      }
      setActiveTask(undefined);
    } else if (activeColumn) {
      try {
        const response = await saveReorderColumn(token, columns);
        console.log("response", response);
      } catch (error) {
        console.error("データの取得に失敗しました。", error);
        //エラーメッセージをセットしてフラッシュを表示 後で実装
      }
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
