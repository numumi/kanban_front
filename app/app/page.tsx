"use client";
import { RecoilRoot } from "recoil";
import BoardList from "./BoardList";

export default function Home() {
  return (
    <RecoilRoot>
      <BoardList />
    </RecoilRoot>
  );
}
