"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <RecoilRoot>
      <div className="flex bg-gray-100">
        <div
          onClick={handleSidebarToggle}
          className={`absolute top-1/2 left-0 z-30`}
          style={{
            width: "30px",
            height: "80px", // 出っ張りの高さを調整
            backgroundColor: "rgba(0,0,0,0.5)", // 半透明の背景色
            cursor: "pointer",
            transform: "translateY(-50%)", // 中央に配置
            borderTopRightRadius: "10px", // 角を丸く
            borderBottomRightRadius: "10px",
            display: isSidebarOpen ? "none" : "flex", // Flexbox を使う
            alignItems: "center", // 垂直方向の中心に配置
            justifyContent: "center", // 水平方向の中心に配置
          }}
        >
          <img
            src="/右矢印.svg"
            alt="menu"
            style={{ width: "40px", height: "auto", filter: "brightness(0) invert(100%)", }}
          />
        </div>

        

        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
          style={{ display: isSidebarOpen ? "block" : "none" }}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <main>{children}</main>
      </div>
    </RecoilRoot>
  );
};

export default Layout;
