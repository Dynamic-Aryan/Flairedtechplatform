import React from 'react'
import { UserData } from '../../context/UserContext'
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const {user}= UserData();
  return (
    <div className="w-48 h-full text-white bg-gray-950 border-r border-gray-500">
    <ul className="list-none p-0">
      <li className="mb-2 cursor-pointer p-3 hover:bg-gray-600">
        <Link to="/admin/dashboard" className="flex items-center text-white">
          <AiFillHome className="mr-2" />
          <span>Home</span>
        </Link>
      </li>

      <li className="mb-2 cursor-pointer p-3 hover:bg-gray-600">
        <Link to="/admin/course" className="flex items-center text-white">
          <FaBook className="mr-2" />
          <span>Courses</span>
        </Link>
      </li>

     
        {
          user && user.mainrole === "superadmin" && (
            <li className="mb-2 cursor-pointer p-3 hover:bg-gray-600">
          <Link to="/admin/users" className="flex items-center text-white">
            <FaUserAlt className="mr-2" />
            <span>Users</span>
          </Link>
        </li>
          )
        }
      

      <li className="cursor-pointer p-3 hover:bg-gray-600">
        <Link to="/account" className="flex items-center text-white">
          <AiOutlineLogout className="mr-2" />
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar