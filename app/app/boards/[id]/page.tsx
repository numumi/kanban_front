"use client";
import { useParams } from "next/navigation";

export default function Board() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <p>bord{id}画面</p>
    </div>
  );
}
