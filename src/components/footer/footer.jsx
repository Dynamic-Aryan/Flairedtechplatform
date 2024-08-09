import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-14 text-center ">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm md:text-xl">
          &copy; 2024  <span className="font-extrabold text-cyan-300">FLAIR</span> Platform. All rights reserved. <br /> Made
          By <a href="#" className="text-white font-light underline">Aryan Pachchigar</a>
        </p>
        
        <div className="mt-5 flex flex-row items-center justify-center gap-10">
          <a href="#" className="text-white md:text-3xl  transition-colors duration-300 hover:text-gray-300 border border-cyan-300 border-r-4">
            <AiFillFacebook />
          </a>
          <a href="#" className="text-white md:text-3xl  transition-colors duration-300 hover:text-gray-300 border border-cyan-300 border-l-4">
            <AiFillTwitterSquare />
          </a>
          <a href="#" className="text-white md:text-3xl transition-colors duration-300 hover:text-gray-300 border border-cyan-300 border-b-4">
            <AiFillInstagram />
          </a>
          <a href="#" className="text-white md:text-3xl transition-colors duration-300 hover:text-gray-300 border border-cyan-300 border-t-4">
            <AiFillGithub />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
