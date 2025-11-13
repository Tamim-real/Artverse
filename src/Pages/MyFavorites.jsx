import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Eye, HeartOff } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/my-favorites?email=${encodeURIComponent(
            user.email
          )}`
        );
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [user?.email]);
  console.log(artworks);
  

  const handleUnfavorite = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/my-favorites/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      if (data.deletedCount > 0) {
        setArtworks((prev) => prev.filter((art) => art._id !== id));
      } else {
        alert("Failed to remove from favorites.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading your favorites...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <article
            key={art._id}
            className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white ring-1 ring-slate-100"
            aria-label={`Artwork card: ${art.title}`}
          >
            <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden bg-slate-50">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                {art.category}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold leading-tight text-slate-900 truncate">
                    {art.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 truncate">
                    {art.created_by}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  to={`/all-arts/${art._id}`}
                  onClick={() => {
                    setShowDetails(true);
                    setSelectedArt(art);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm text-sm font-medium transition-transform transform hover:-translate-y-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </Link>

                <button
                  onClick={() => handleUnfavorite(art._id)} 
                  
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-transform transform hover:-translate-y-0.5"
                >
                  <HeartOff className="h-4 w-4" />
                  <span>Unfavorite</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal for details */}
      {showDetails && selectedArt && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetails(false)}
          />
          <motion.dialog
            initial={{ y: 40, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 max-w-3xl w-full rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src={selectedArt.image}
                  alt={selectedArt.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedArt.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  By {selectedArt.created_by}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Category: {selectedArt.category}
                </p>
                <div className="mt-4 text-sm text-slate-700">
                  {selectedArt.description ||
                    "No additional description provided."}
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
      
      
    </div>
  );
};

export default MyFavorites;
