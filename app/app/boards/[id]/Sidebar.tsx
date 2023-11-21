"use client";
import Link from "next/link";
import { useRecoilValueLoadable } from "recoil";
import { fetchBoardList } from "@/recoils/selectors/fetchBoardList";

const Sidebar = () => {
  const boardListLoadable = useRecoilValueLoadable(fetchBoardList);
  const boardList =
    boardListLoadable.state === "hasValue" ? boardListLoadable.contents : [];
  const isLoading = boardListLoadable.state === "loading";
  const hasError = boardListLoadable.state === "hasError";

  console.log("boardList", boardList);
  return (
    <div style={{ width: "var(--sidebar-width)" }} className="p-2">
      <h2>ボード一覧</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : hasError ? (
        <p>Error occurred while loading board list.</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {boardList.map((board) => (
            <Link key={board.id} href={`/boards/${board.id}`}>
              <li className="flex items-center my-10">
                <img
                  src={board.image}
                  alt={board.name}
                  width="50"
                  height="50"
                  className="mr-2 rounded"
                />
                <p>{board.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
