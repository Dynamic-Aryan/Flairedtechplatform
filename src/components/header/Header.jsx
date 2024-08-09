import React from "react";
import { Link } from "react-router-dom";

const Header = ({isAuth}) => {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md relative">
      <div className="text-lg font-semibold text-cyan-400 md:text-2xl">Flair</div>
      <div className="flex gap-2 md:gap-10">
        <Link to="/" className="text-cyan-800 transition duration-300 hover:text-cyan-500">Home</Link>
        <Link to="/courses" className="text-cyan-800 transition duration-300 hover:text-cyan-500">Courses</Link>
        <Link to="/about" className="text-cyan-800 transition duration-300 hover:text-cyan-500">About</Link>
        {isAuth ? (
          <Link to="/account" className="text-cyan-800 transition duration-300 hover:text-cyan-500">Account</Link>
        ) : (
          <Link to="/login" className="text-cyan-800 transition duration-300 hover:text-cyan-500">Login</Link>
        )}
        
        
        
      </div>
    </header>
  );
};

export default Header;
