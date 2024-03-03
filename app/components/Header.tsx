"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { Login, Logout } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import tokenState from "@/recoils/atoms/tokenState";

// import LogoutButton from "../components/LogoutButton";

const Header = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const setToken = useSetRecoilState(tokenState);

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
  return (
    <header
      style={{ height: "var(--header-height)" }}
      className="bg-blue-500 p-4 flex justify-between items-center"
    >
      {/* ロゴ */}
      <Link href="/" className="text-white text-2xl font-bold">
        BOARD APP
      </Link>

      {/* 検索フォーム */}
      {/* <div className="relative mx-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-white text-gray-700 rounded-full py-1 pl-4 pr-12 focus:outline-none focus:shadow-outline"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </button>
      </div> */}

      {/* <div className="flex items-center space-x-4">
        <NotificationsIcon className="text-white text-2xl cursor-pointer" />

        <SettingsIcon className="text-white text-2xl cursor-pointer" />

        <AccountCircleIcon className="text-white text-2xl cursor-pointer" />
      </div> */}
      <div className="flex items-center space-x-4">
        {user ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="text-white text-2xl cursor-pointer"
          >
            ログアウト
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="text-white text-2xl cursor-pointer"
          >
            ログイン
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
