import React from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
