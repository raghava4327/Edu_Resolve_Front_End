import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons from react-icons

const StudentNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function logout() {
    // Implement logout logic here, similar to the AdminNavbar
    localStorage.clear();
    console.log("logged out successfully");
    navigate("/login");
  }

  // Adding simple animation style for the menu
  const menuAnimationStyle = {
    transition: "transform 300ms ease-in-out",
    transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
  };

  return (
    <nav className="bg-white text-black p-2 shadow-lg flex justify-between items-center">
      <div className="text-xl font-MajorMono">Edu Resolve</div>
      {/* Toggle button */}
      <div className="md:hidden flex items-center p-5">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6 text-black" />
          ) : (
            <FaBars className="h-6 w-6 text-black" />
          )}
        </button>
      </div>
      {/* Mobile Menu with animation */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"}  absolute top-16 left-0 w-full bg-[#917A68] md:hidden`}
        style={menuAnimationStyle}
      >
        <a
          href="#"
          className="block py-2 px-4 text-sm font-Montserrat text-white hover:bg-gray-700"
        >
          Home
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm font-Montserrat text-white hover:bg-gray-700"
        >
          Notifications
        </a>
        <a
          href="#"
          className="block py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Profile
        </a>
        <button
          onClick={logout}
          className="w-full text-left py-2 px-4 text-sm text-white hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-1">
        <a
          href="#"
          className="py-5 px-3 text-black font-Montserrat hover:underline"
        >
          Home
        </a>
        <a
          href="#"
          className="py-5 px-3 text-black font-Montserrat hover:underline"
        >
          Notifications
        </a>
        <a
          href="#"
          className="py-5 px-3 text-black font-Montserrat hover:underline"
        >
          Profile
        </a>
        <button
          onClick={logout}
          className=" font-Montserrat py-2 px-3 bg-red-600 hover:bg-red-700 rounded text-white transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
