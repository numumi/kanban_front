"use client";
import { useParams } from "next/navigation";
import BoardBody from "./BoardBody";
import { RecoilRoot } from "recoil";

export default function Board() {
  // ボードidに対するデータを取得してatomに格納
  {
    console.log("11111111111");
  }

  return (
    <RecoilRoot>
      {/* ボードのヘッダー ボード名とアサインユーザーのアイコンを表示 */}
      {/* ボード本体 */}
      <BoardBody />
    </RecoilRoot>
  );
}
