import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-t from-[rgb(21,20,20)] via-[rgb(47,41,41)] to-[rgb(5,11,14)] shadow-md relative z-50"> {/* Set z-index here */}
      <div className="text-lg font-semibold text-gray-400 md:text-3xl md:ml-10">
        F_L_A_I_<span className="font-bold text-white">R</span>
      </div>

      {/* Menu icon for mobile view */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-slate-200 text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu - Always visible */}
      <div className="hidden md:flex gap-5 md:gap-16">
        <Link to="/" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">o1Home</Link>
        <Link to="/courses" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">10Courses</Link>
        
        {isAuth ? (
          <Link to="/account" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">100Account</Link>
        ) : (
          <Link to="/login" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">100Login</Link>
        )}
      </div>

      {/* Mobile Menu - Toggles visibility */}
      <div className={`flex flex-col gap-5 p-10 rounded-lg shadow-lg absolute top-16 right-5 bg-gradient-to-r from-[rgb(57,57,57)] via-[rgb(130,130,130)] to-[rgb(5,11,14)] transition-all duration-300 ${menuOpen ? "block" : "hidden"} z-60`}> {/* Add z-index here */}
        <Link to="/" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">o1Home</Link>
        <Link to="/courses" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">10Courses</Link>
      
        {isAuth ? (
          <Link to="/account" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">100Account</Link>
        ) : (
          <Link to="/login" className="text-slate-200 text-xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-300 font-bold">100Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
