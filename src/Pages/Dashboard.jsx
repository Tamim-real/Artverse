import React, { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { 
  User, 
  PlusSquare, 
  Image as GalleryIcon, 
  Heart, 
  LogOut, 
  LayoutDashboard 
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  const menuItems = [
    { name: "My Profile", path: "/my-profile", icon: <User size={20} /> },
    { name: "Add Artwork", path: "/add-art", icon: <PlusSquare size={20} /> },
    { name: "My Gallery", path: "/myart", icon: <GalleryIcon size={20} /> },
    { name: "My Favorites", path: "/my-favorites", icon: <Heart size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-gray-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg flex items-center justify-center text-sm">
              A
            </div>
            Artverse
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src={user?.photoURL || "https://via.placeholder.com/40"} 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Mobile Header (Shown only on small screens) */}
        <div className="md:hidden flex items-center justify-between mb-8">
           <h2 className="text-xl font-bold dark:text-white">Dashboard</h2>
           {/* You can add a mobile menu toggle here */}
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Outlet /> {/* এখানে My Profile, Add Artwork ইত্যাদি পেজগুলো লোড হবে */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;