import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Mail, User as UserIcon, Calendar, ShieldCheck, Edit3 } from "lucide-react";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  // ইউজারের জয়েনিং ডেট ফরম্যাট করা (যদি ফায়ারবেস মেটাডাটা থাকে)
  const joinDate = user?.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : "Not available";

  return (
    <div className="max-w-4xl mx-auto mt-25">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="relative group">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 shadow-lg"
              />
              <button className="absolute bottom-1 right-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                <Edit3 size={16} />
              </button>
            </div>
            
            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              {user?.displayName || "Anonymous Artist"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <ShieldCheck size={14} className="text-green-500" /> Verified Artist
            </p>
          </div>
        </div>

        {/* Right Side: Details Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">
              Personal Information
            </h3>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-300">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.displayName || "N/A"}</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-gray-900 dark:text-white font-medium">{user?.email || "N/A"}</p>
                </div>
              </div>

              {/* Joined Date */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-300">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</p>
                  <p className="text-gray-900 dark:text-white font-medium">{joinDate}</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-10 pt-6 border-t dark:border-gray-700">
              <button className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-black dark:hover:bg-gray-100 transition-all shadow-sm">
                Update Profile
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;