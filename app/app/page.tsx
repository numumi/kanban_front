"use client";
import { useEffect, useState } from "react";
import BoardList from "../features/components/BoardList";
import Top from "../components/Top";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth0(); // Replace with your login check logic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // ここにローディングスピナーなどを表示
  }
  return isAuthenticated ? <BoardList /> : <Top />;
}
