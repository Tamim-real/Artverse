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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f9fa] dark:bg-gray-900">
      {/* Background Decorative Circles */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-[#fbc2eb] rounded-full blur-[100px] opacity-50 animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-[#a18cd1] rounded-full blur-[100px] opacity-50 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/80 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden">
          
          <div className="p-8">
            <div className="text-center mb-8">
  {/* Clean & Professional Branding */}
  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-center gap-2">
    <span className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-2 py-1 rounded-lg text-2xl">A</span>
    Artverse
  </h2>
  <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Please enter your details</p>
</div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="group">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue="admin@admin.com"
                  placeholder="name@example.com"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#a18cd1] focus:ring-4 focus:ring-[#a18cd1]/20 outline-none transition-all duration-300 shadow-sm"
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1 mb-1 block">Password</label>
                <input
                  type="password"
                  name="password"
                  defaultValue="123456"
                  placeholder="••••••••"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#a18cd1] focus:ring-4 focus:ring-[#a18cd1]/20 outline-none transition-all duration-300 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform active:scale-95 shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="relative flex items-center justify-center my-8">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              <span className="absolute px-4 bg-transparent text-gray-400 text-sm">OR</span>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl py-3.5 font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm border-b-4 active:border-b-0 active:translate-y-1"
            >
              <FcGoogle size={24} /> Sign in with Google
            </button>

            {error && (
              <p className="text-red-500 text-center text-sm mt-4 font-medium animate-bounce">{error}</p>
            )}

            <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              New here?{" "}
              <Link
                to="/register"
                className="font-bold text-gray-900 dark:text-white hover:text-[#a18cd1] underline decoration-2 underline-offset-4 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;