import { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
          toast.error("This email is already registered.");
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
        toast.success("Logged in successfully!");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f9fa] dark:bg-gray-900">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-[1.5rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          
          <div className="p-8">
            <div className="text-center mb-8">
              {/* Logo Style consistent with Login */}
              <h2 className="text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <div className="w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl flex items-center justify-center text-xl">
                  A
                </div>
                Artverse
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm font-medium">Create your artist account</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:bg-white focus:border-gray-900 dark:focus:border-white outline-none transition-all duration-200 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <input
                  type="url"
                  name="photo"
                  placeholder="Photo URL (e.g., https://...)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:bg-white focus:border-gray-900 dark:focus:border-white outline-none transition-all duration-200 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:bg-white focus:border-gray-900 dark:focus:border-white outline-none transition-all duration-200 text-gray-800 dark:text-gray-100"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (Min 6 chars, A-Z, a-z)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 focus:bg-white focus:border-gray-900 dark:focus:border-white outline-none transition-all duration-200 text-gray-800 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-semibold rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all duration-200 shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="relative flex items-center justify-center my-8">
              <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
              <span className="absolute px-3 bg-white dark:bg-gray-800 text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold">Or register with</span>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
            >
              <FcGoogle size={20} /> Google
            </button>

            <p className="mt-8 text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-gray-900 dark:text-white hover:underline decoration-2 underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;