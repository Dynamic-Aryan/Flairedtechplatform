import React from "react";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-grow p-6 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
