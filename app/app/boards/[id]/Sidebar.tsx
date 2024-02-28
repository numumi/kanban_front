"use client";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchBoardList } from "@/recoils/selectors/fetchBoardList";
import { boardsState } from "@/recoils/atoms/boardState";
import tokenState from "@/recoils/atoms/tokenState";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
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

  useEffect(() => {
    if (!token) return;
    const fetchBoardList = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL!, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBoadList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBoardList();
  }, [token]);

  if (!boardList) {
    return <div>⏳loading...</div>;
  }

  return (
    <div style={{ width: "var(--sidebar-width)" }} className="p-2">
      <h2>ボード一覧</h2>
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
