"use client";
import BoardList from "./BoardList";
import Top from "./Top";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user } = useAuth0(); // Replace with your login check logic

  return user ? <BoardList /> : <Top />;
}
