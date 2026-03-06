import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/10 glass backdrop-blur-md bg-black/50"
    >
      <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all flex items-center justify-center shrink-0">
            <img src={logo} alt="Vignan's Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          </div>
          <div className="flex flex-col justify-center translate-y-0.5">
            <h1 className="text-base sm:text-xl text-white tracking-widest leading-tight font-bold">
              VIGNAN UNIVERSITY
            </h1>
            <span className="text-[10px] sm:text-xs text-emerald-400 font-bold tracking-[0.2em] uppercase leading-tight mt-0.5">
              SGPA Calculator
            </span>
          </div>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to="/"
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Calculator
          </Link>
          <Link
            to="/guide"
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              location.pathname === "/guide"
                ? "bg-white text-black"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            Guide
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
