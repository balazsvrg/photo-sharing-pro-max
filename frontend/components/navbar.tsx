"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = localStorage.getItem("username");
      if (username) {
        setUsername(username);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition">
        PhotoSharing 3000 Ultra Pro Max 2s
      </Link>
      <div className="flex items-center space-x-4 relative">
        {!username ? (
          <Link
            href="/login"
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </Link>
        ) : (
          <div className="relative flex items-center">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-lg bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <span className="text-xl mr-2">👤</span>
              {username}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-gray-800 text-white rounded-lg shadow-lg z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-500 rounded-b-lg transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
