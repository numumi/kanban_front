"use client";
import { useParams } from "next/navigation";

import Board from "./Board";
import TaskDetailsModal from "./TaskDetailModal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { modalTaskState } from "@/recoils/boardState";

export default function BoardPage() {
  return (
    <RecoilRoot>
      <div className="flex-1">
        <Board />
      </div>
      <TaskDetailsModal />
    </RecoilRoot>
  );
}

// 必要そうなcontext
// modalOpen
// openTaskID
