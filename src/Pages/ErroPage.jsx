import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradientMove">
      {/* Animated Background Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl animate-pulse delay-150"></div>

      {/* Content */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-[6rem] md:text-[9rem] font-extrabold leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] via-[#38bdf8] to-[#9333ea] animate-textShine">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          Looks like you wandered into an unknown art dimension. Let’s get you
          back to the gallery.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300"
        >
          🎨 Back to Home
        </button>
      </div>

      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#38bdf8] via-[#f59e0b] to-[#9333ea] animate-moveLine"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9333ea] via-[#38bdf8] to-[#f59e0b] animate-moveLineReverse"></div>
    </section>
  );
};

export default ErrorPage;
