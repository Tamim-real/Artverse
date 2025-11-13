import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const LoginPage = () => {
  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        toast.success(`Welcome back, ${user.displayName || "Artist"}! 🎨`);
      })
      .catch((error) => {
        toast.error("Invalid email or password ❌");
        console.error(error);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(result => {
        setUser(result.user);
        setSuccess(true);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-[#fbc2eb] to-[#a18cd1]">
          <h2 className="text-3xl font-bold text-black mb-6 text-center drop-shadow-lg">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="px-4 py-3 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f6d365] transition duration-300"
            />

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 my-4">
            <span className="text-white/80">or</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border-2 border-white/70 rounded-xl py-3 text-white font-semibold hover:bg-white hover:text-gray-900 transition duration-300"
          >
            <FcGoogle size={24} /> Login with Google
          </button>

          {success && (
            <p className="text-green-600 text-center mt-2">Logged in successfully</p>
          )}
          {error && (
            <p className="text-red-600 text-center mt-2">{error}</p>
          )}

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
