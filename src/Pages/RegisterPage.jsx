import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:", name, photo, email, password);
    // Add your registration logic here
  };

  const handleGoogleSignup = () => {
    console.log("Google signup triggered");
    // Add your Google signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] p-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        {/* Form Container */}
        <div className="p-8 bg-gradient-to-r from-[#fbc2eb] to-[#a18cd1]">
          <h2 className="text-3xl font-bold text-black mb-6 text-center drop-shadow-lg">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Photo URL"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-white/80">or</span>
          </div>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border-2 border-white/70 rounded-xl py-3 text-white font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
          >
            <FcGoogle size={24} /> Sign up with Google
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-white/90">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-white underline hover:text-[#f6d365] transition duration-300"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
