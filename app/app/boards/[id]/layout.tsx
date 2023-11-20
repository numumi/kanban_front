"use client";
import React from "react";
import Sidebar from "./Sidebar";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <RecoilRoot>
      <div className="flex bg-gray-100">
        <Sidebar />
        <main>{children}</main>
      </div>
    </RecoilRoot>
  );
};

export default Layout;
