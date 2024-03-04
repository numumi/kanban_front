"use client";
import BoardList from "../features/components/BoardList";
import Top from "../components/Top";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0(); // Replace with your login check logic

  if (isLoading && !isAuthenticated) {
    return <div>Loading...</div>; // ここにローディングスピナーなどを表示
  }
  return isAuthenticated ? <BoardList /> : <Top />;
}
