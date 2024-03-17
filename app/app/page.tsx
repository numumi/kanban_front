"use client";
import Spinner from "@/components/Spinner";
import BoardList from "../components/BoardList";
import Top from "../components/Top";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0(); // Replace with your login check logic

  if (isLoading) {
    return <Spinner />;
  }
  return isAuthenticated ? <BoardList /> : <Top />;
}
