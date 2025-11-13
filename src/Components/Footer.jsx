import React from "react";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

// Custom X icon (official logo)
const XIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M18.244 3H21.5l-7.5 8.57L22 21h-6.244l-4.756-5.756L6.244 21H3l7.756-8.43L2 3h6.244l4.5 5.43L18.244 3z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: XIcon, href: "#" }, // X logo instead of Twitter
    { icon: Youtube, href: "#" },
    { icon: Mail, href: "#" },
  ];

  return (
    <footer className="relative mt-16 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] clip-footer"></div>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#fcd34d]">
            Artverse
          </h2>
          <p className="text-sm text-gray-300 max-w-xs">
            Discover, collect, and showcase your favorite artworks in one artistic universe.
          </p>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-[#fbbf24]">Contact</h3>
          <p className="text-gray-300 text-sm">Email: contact@artverse.com</p>
          <p className="text-gray-300 text-sm">Phone: +880 1234-567890</p>
        </div>

        <div className="flex space-x-4 justify-center md:justify-end">
          {socialLinks.map(({ icon: Icon, href }, i) => (
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

      <div className="relative z-10 border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} Artverse. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-400 hover:text-[#fbbf24] cursor-pointer transition-colors duration-300">
            Developed by Tamim
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
