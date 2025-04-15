import React from "react";
import { UserData } from "../../context/UserContext";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user } = UserData();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gradient-to-t from-slate-50 to-teal-400 text-white p-6">
      <div className="space-y-6">
        <Link to="/admin/dashboard" className="flex items-center text-lg font-medium hover:text-teal-200">
          <AiFillHome className="mr-3" />
          Dashboard
        </Link>
        <Link to="/admin/course" className="flex items-center text-lg font-medium hover:text-teal-200">
          <FaBook className="mr-3" />
          Courses
        </Link>

        {user && user.mainrole === "superadmin" && (
          <Link to="/admin/users" className="flex items-center text-lg font-medium hover:text-teal-200">
            <FaUserAlt className="mr-3" />
            Users
          </Link>
        )}

        <button
          onClick={logout}
          className="flex items-center text-lg font-medium hover:text-teal-200 mt-8"
        >
          <AiOutlineLogout className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
