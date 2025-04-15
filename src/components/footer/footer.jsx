import React from "react";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  from-slate-50 to-teal-100 py-12 text-center text-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm md:text-lg font-medium">
          &copy; 2024 <span className="font-bold text-teal-500">FLAIR</span> Platform. All rights reserved.
        </p>

        <div className="mt-6 flex justify-center gap-10 text-3xl text-gray-700">
          <a
            href="#"
            className="transition-transform transform hover:scale-110 hover:text-teal-500"
          >
            <AiFillFacebook />
          </a>
          <a
            href="#"
            className="transition-transform transform hover:scale-110 hover:text-teal-500"
          >
            <AiFillTwitterSquare />
          </a>
          <a
            href="#"
            className="transition-transform transform hover:scale-110 hover:text-teal-500"
          >
            <AiFillInstagram />
          </a>
          <a
            href="#"
            className="transition-transform transform hover:scale-110 hover:text-teal-500"
          >
            <AiFillGithub />
          </a>
        </div>

        <div className="mt-8">
          <Link
            to="/about"
            className="text-teal-600 font-semibold text-lg px-8 py-3 border-2 border-teal-500 rounded-full transition-colors duration-300 hover:bg-teal-500 hover:text-white"
          >
            About Company
          </Link>
        </div>

        <div className="mt-8 text-sm md:text-base font-light text-gray-600">
          Made with ❤️ by{" "}
          <a href="#" className="text-teal-600 font-semibold hover:underline">
            Aryan Pachchigar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
