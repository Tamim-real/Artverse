import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { createUser, setUser, googleSignIn, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

   
    const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;

    if (!uppercaseReg.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }

    if (!lowercaseReg.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration successful!");
            form.reset();
            navigate(location.state?.from?.pathname || "/");
          })
          .catch((err) => {
            toast.error("Profile update failed: " + err.message);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already registered. Please login or use another email.");
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google successfully!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab] p-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-[#fbc2eb] to-[#a18cd1]">
          <h2 className="text-3xl font-bold text-black mb-6 text-center drop-shadow-lg">
            Create Your Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="url"
              name="photo"
              placeholder="Photo URL"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300 text-gray-700"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-white/80">or</span>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border-2 border-white/70 rounded-xl py-3 text-white font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
          >
            <FcGoogle size={24} /> Sign up with Google
          </button>

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
