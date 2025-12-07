// src/components/Navbar.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextChampLogo from "./NextChampLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full bg-transparent backdrop-blur-md">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <div>
            <a href="#">
              <NextChampLogo size="small" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex p-2 text-white transition-all duration-200 rounded-md lg:hidden hover:bg-gray-800 focus:bg-gray-800"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-10">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-base font-semibold text-gray-200 transition-all duration-200 hover:text-white/80"
              >
                {link.name}
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold rounded-full 
              bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md shadow-orange-500/30"
            >
              Try for free
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-gray-900/95 backdrop-blur-md shadow-xl overflow-hidden"
          >
            <div className="flex flex-col px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  className="text-base font-semibold text-gray-200 hover:text-orange-400 transition-all"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile CTA Button */}
              <motion.a
                href="#"
                className="inline-flex items-center justify-center px-5 py-2 mt-2 font-semibold text-white 
                rounded-full bg-orange-500 hover:bg-orange-600 transition-all shadow-md shadow-orange-500/30"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => setIsOpen(false)}
              >
                Try for free
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
