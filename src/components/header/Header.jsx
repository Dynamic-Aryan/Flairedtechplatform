import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/courses">Courses</Link>
      </Menu.Item>
      {isAuth ? (
        <Menu.Item key="3">
          <Link to="/account">Account</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="4">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-t from-slate-50 to-teal-100 shadow-lg">
      {/* Logo/Branding */}
      <div className="text-4xl font-extrabold text-teal-800">
        FLAIR
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <Button
          onClick={toggleMenu}
          className="text-gray-800 text-3xl focus:outline-none hover:text-teal-600 transition duration-300"
          icon={menuOpen ? <FaTimes /> : <FaBars />}
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-8 text-lg text-teal-700">
        <Link
          to="/"
          className="relative py-2 px-4 hover:bg-teal-200 rounded-md transition duration-300 group"
        >
          Home
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        <Link
          to="/courses"
          className="relative py-2 px-4 hover:bg-teal-200 rounded-md transition duration-300 group"
        >
          Courses
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        {isAuth ? (
          <Link
            to="/account"
            className="relative py-2 px-4 hover:bg-teal-200 rounded-md transition duration-300 group"
          >
            Account
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="relative py-2 px-4 hover:bg-teal-200 rounded-md transition duration-300 group"
          >
            Login
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-20 right-0 w-64 p-6 bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out transform ${
          menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <Dropdown overlay={menu} trigger={['click']} className="w-full">
          <Button className="w-full text-lg bg-teal-100 hover:bg-teal-200">
            Menu <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
