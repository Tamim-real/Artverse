import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] clip-footer"></div>

      {/* Overlay glass effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo and Name */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#fcd34d]">
            Artverse
          </h2>
          <p className="text-sm text-gray-300 max-w-xs">
            Discover, collect, and showcase your favorite artworks in one artistic universe.
          </p>
        </div>

        {/* Middle: Contact Info */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-[#fbbf24]">Contact</h3>
          <p className="text-gray-300 text-sm">Email: contact@artverse.com</p>
          <p className="text-gray-300 text-sm">Phone: +880 1234-567890</p>
        </div>

        {/* Right: Social Links */}
        <div className="flex space-x-4 justify-center md:justify-end">
          {[
            { icon: Facebook, href: "#" },
            { icon: Instagram, href: "#" },
            { icon: Twitter, href: "#" },
            { icon: Youtube, href: "#" },
            { icon: Mail, href: "#" },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="p-2 rounded-full bg-white/10 hover:bg-[#38bdf8] hover:text-black transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} Artverse. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-400 hover:text-[#fbbf24] cursor-pointer transition-colors duration-300">
            Designed with ❤️ by Tamims
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
