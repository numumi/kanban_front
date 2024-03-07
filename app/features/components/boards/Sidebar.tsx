"use client";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { boardsState } from "@/recoils/atoms/boardState";
import tokenState from "@/recoils/atoms/tokenState";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import { useFetchBoardList } from "@/features/hooks/useFetchBoardList";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const Sidebar = (props: SidebarProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = props;
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useRecoilState(tokenState);
  const [boardList, setBoadList] = useRecoilState(boardsState);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently({});
        setToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  useFetchBoardList(token, setBoadList);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!boardList) {
    return <div>⏳loading...</div>;
  }

  return (
    <div style={{ width: "var(--sidebar-width)" }} className="p-2">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>ボード一覧</h2>
        <button
          onClick={handleSidebarToggle}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)", // 半透明の背景色
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          <img
            src="/左矢印.svg"
            alt="menu"
            style={{
              width: "30px",
              height: "auto",
              color: "white",
              filter: "brightness(0) invert(100%)",
            }}
          />
        </button>
      </div>
      {!boardList ? (
        <p>Loading...</p>
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
