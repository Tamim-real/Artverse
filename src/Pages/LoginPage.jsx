import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Add your Google login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] p-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Form Container with soft gradient */}
        <div className="p-8 bg-gradient-to-r from-[#fbc2eb] to-[#a18cd1]">
          <h2 className="text-3xl font-bold text-black mb-6 text-center drop-shadow-lg">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-white/80">or</span>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border-2 border-white/70 rounded-xl py-3 text-white font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
          >
            <FcGoogle size={24} /> Login with Google
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-white/90">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-white underline hover:text-[#f6d365] transition duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
