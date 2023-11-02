"use client";
import { useParams } from "next/navigation";
import BoardBody from "./BoardBody";
import { RecoilRoot } from "recoil";

export default function Board() {
  return (
    <RecoilRoot>
      {/* ボードのヘッダー ボード名とアサインユーザーのアイコンを表示 */}
      {/* ボード本体 */}
      <BoardBody />
    </RecoilRoot>
  );
}
