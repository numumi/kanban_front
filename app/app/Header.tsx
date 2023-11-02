import React from "react";
import Link  from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center">
      {/* ロゴ */}
      <Link href="/" className="text-white text-2xl font-bold">
        BOARD APP
      </Link>

      {/* 検索フォーム */}
      <div className="relative mx-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-white text-gray-700 rounded-full py-1 pl-4 pr-12 focus:outline-none focus:shadow-outline"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <SearchIcon />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* 通知アイコン */}
        <NotificationsIcon className="text-white text-2xl cursor-pointer" />

        {/* 設定アイコン */}
        <SettingsIcon className="text-white text-2xl cursor-pointer" />

        {/* ユーザーアイコン */}
        <AccountCircleIcon className="text-white text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
