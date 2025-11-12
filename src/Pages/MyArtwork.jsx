import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";

const MyArtwork = () => {
  const { user } = use(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  console.log(artworks);
  

  
  useEffect(() => {
    if (!user?.email) return;

    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/myart/${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [user?.email]);

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  const handleOpenModal = (artwork) => {
    setCurrentArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentArtwork(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentArtwork((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!currentArtwork || !currentArtwork._id) {
    console.error("Artwork ID missing!");
    return;
  }

  try {
    
    const res = await fetch(`http://localhost:3000/all-arts/${currentArtwork._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentArtwork),
    });

    
    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const updatedArtwork = await res.json();
    console.log("✅ Artwork updated:", updatedArtwork);

    
    setArtworks((prev) =>
      prev.map((art) =>
        art._id === updatedArtwork._id ? { ...art, ...updatedArtwork } : art
      )
    );

    handleCloseModal();
  } catch (err) {
    console.error("❌ Update failed:", err);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:3000/all-arts/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);

   
    setArtworks((prev) => prev.filter((art) => art._id !== id));
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] grid md:grid-cols-2 gap-6 p-6">
      {artworks.map((artwork) => (
        <motion.div
  key={artwork._id}
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 200 }}
  className="relative mt-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 group w-[320px] h-[530px] mx-auto"
>
          {/* Artwork Image */}
          <div className="relative overflow-hidden h-60">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2 text-gray-100">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              {artwork.title}
            </h3>
            <p className="text-sm">
              <span className="font-semibold">Medium:</span> {artwork.medium}
            </p>
            <p className="text-sm line-clamp-3">{artwork.description}</p>

            <div className="text-sm space-y-1 mt-2">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {artwork.category || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Dimensions:</span>{" "}
                {artwork.dimensions || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                {artwork.price ? `$${artwork.price}` : "Not for sale"}
              </p>
              <p>
                <span className="font-semibold">Visibility:</span>{" "}
                <span
                  className={`${
                    artwork.visibility === "Public"
                      ? "text-green-400"
                      : "text-red-400"
                  } font-medium`}
                >
                  {artwork.visibility}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleOpenModal(artwork)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-all"
              >
                <Pencil className="w-4 h-4" /> Update
              </button>
              <button
                onClick={() => handleDelete(artwork._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-black rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Update Modal */}
      {isModalOpen && currentArtwork && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-900 p-6 rounded-2xl w-[90%] max-w-lg shadow-xl border border-yellow-400/20">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
              Update Artwork
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="image"
                value={currentArtwork.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <input
                type="text"
                name="title"
                value={currentArtwork.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <input
                type="text"
                name="category"
                value={currentArtwork.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <input
                type="text"
                name="medium"
                value={currentArtwork.medium}
                onChange={handleChange}
                placeholder="Medium / Tools"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <textarea
                name="description"
                value={currentArtwork.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <input
                type="text"
                name="dimensions"
                value={currentArtwork.dimensions}
                onChange={handleChange}
                placeholder="Dimensions"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <input
                type="number"
                name="price"
                value={currentArtwork.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              />
              <select
                name="visibility"
                value={currentArtwork.visibility}
                onChange={handleChange}
                className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArtwork;
