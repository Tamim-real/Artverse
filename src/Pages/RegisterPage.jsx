
import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const RegisterPage = () => {

  const {createUser, setUser, googleSignIn, updateUser} = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(false); 
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

     const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;

    if (!uppercaseReg.test(password)) {
      setError("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }

    if (!lowercaseReg.test(password)) {
      setError("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    

    
    createUser(email, password)
    .then(result=>{
      const user = result.user;
      updateUser({ displayName: name, photoURL: photo })
      
      .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            setSuccess(true);
            e.target.reset();
            navigate(location.state?.from?.pathname || "/");
          })
          .catch(err => setError("Profile update failed: " + err.message));
      })
      
    .catch(error=>{
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    
  };

  const handleGoogleSignup = () => {
     setError(""); setLoading(true);
    googleSignIn()
      .then(result => {
        setUser(result.user);
        setSuccess(true);
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">Registration successful!</p>}
            <button
              type="submit" disabled={loading}
              className="mt-4 bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            >
             {loading ? "Creating Account..." : "Register"}
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
