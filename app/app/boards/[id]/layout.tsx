import React from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
