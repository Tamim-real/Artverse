import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { user, logOut } = useContext(AuthContext); // Get user info and logout function

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] md:w-[85%] rounded-2xl shadow-2xl z-50 backdrop-blur-xl bg-gradient-to-r from-[#0f172a]/90 via-[#1e293b]/80 to-[#0f172a]/90 border border-white/10 transition-all duration-500 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#fcd34d] tracking-wide">
          Artverse
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <NavLink to="/" className="hover:text-[#38bdf8] transition-colors duration-300">
            Home
          </NavLink>
          <button className="hover:text-[#38bdf8] transition-colors duration-300">
            Explore Artworks
          </button>
          <NavLink to="add-art" className="hover:text-[#38bdf8] transition-colors duration-300">Add Artwork</NavLink>
          <button className="hover:text-[#38bdf8] transition-colors duration-300">
            My Gallery
          </button>
          <button className="hover:text-[#38bdf8] transition-colors duration-300">
            My Favorites
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Photo */}
              <img
                src={user.photoURL || "https://i.ibb.co/ZYW3VTp/broken-image.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-[#38bdf8] object-cover"
                title={user.displayName || "User"}
              />
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl border border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black font-semibold hover:scale-105 transition-transform duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#0f172a]/95 to-[#1e293b]/95 backdrop-blur-xl text-gray-200 px-6 pb-6 space-y-4 flex flex-col text-center border-t border-white/10 rounded-b-2xl animate-slideDown">
          <NavLink to="/" className="hover:text-[#38bdf8]" onClick={toggleMenu}>
            Home
          </NavLink>
          <button className="hover:text-[#38bdf8]" onClick={toggleMenu}>
            Explore Artworks
          </button>
          <button className="hover:text-[#38bdf8]" onClick={toggleMenu}>
            Add Artwork
          </button>
          <button className="hover:text-[#38bdf8]" onClick={toggleMenu}>
            My Gallery
          </button>
          <button className="hover:text-[#38bdf8]" onClick={toggleMenu}>
            My Favorites
          </button>

          {/* Mobile Conditional Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            {user ? (
              <>
                <div className="flex justify-center">
                  <img
                    src={user.photoURL || "https://i.ibb.co/ZYW3VTp/broken-image.png"}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-[#38bdf8] object-cover"
                  />
                </div>
                <button
                  className="border border-red-400 py-2 rounded-xl text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-[#38bdf8] py-2 rounded-xl text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black py-2 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
