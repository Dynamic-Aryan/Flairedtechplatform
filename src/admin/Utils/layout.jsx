import React from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-[80vh] mt-5">
      <Sidebar />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default Layout;
