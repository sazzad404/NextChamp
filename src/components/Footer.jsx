import React from 'react';
import { Link } from 'react-router-dom'; // jodi react-router use koro, na hole <a> use koro

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              ContestHub
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Bangladesh er sobcheye boro contest platform. Graphic design, video editing, writing, photography — sob category te exciting contest ek jaygay!
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.621h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.407 0 22.676 0z"/>
                </svg>
              </a>

              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05 1.883 0 3.616-.641 4.983-1.721-1.771-.032-3.271-.987-3.785-2.305.25.037.499.062.761.062.361 0 .724-.05 1.061-.137-1.853-.355-3.254-1.984-3.254-3.923 0-.171.047-.339.125-.496 1.879.913 3.955 1.459 6.047 1.52-1.634-1.087-2.677-2.938-2.677-5.036 0-1.109.3-2.145.828-3.028 2.025 2.446 5.04 4.049 8.388 4.218-.067-.303-.1-.616-.1-.928 0-2.235 1.809-4.044 4.044-4.044 1.165 0 2.215.486 2.952 1.268 1.919-.378 3.725-1.087 5.346-2.055-.63 1.967-1.969 3.616-3.71 4.64 1.706-.19 3.342-.607 4.994-1.225-.948 2.805-2.947 5.142-5.236 6.811z"/>
                </svg>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.69.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.76 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44 0 .795.645 1.44 1.441 1.44.797 0 1.441-.645 1.441-1.44 0-.795-.645-1.441-1.441-1.441z"/>
                </svg>
              </a>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/contests" className="hover:text-purple-400 transition">All Contests</Link></li>
              <li><Link to="/create-contest" className="hover:text-purple-400 transition">Create Contest</Link></li>
              <li><Link to="/winners" className="hover:text-purple-400 transition">Winners</Link></li>
              <li><Link to="/faq" className="hover:text-purple-400 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition">Graphic Design</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Video Editing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Photography</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Writing</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Web Development</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-purple-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} ContestHub. All rights reserved. Made by Sazzad Hasan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;