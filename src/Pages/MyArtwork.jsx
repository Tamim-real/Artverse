import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const MyArtwork = () => {
  const { user } = use(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          `https://artverse-server.vercel.app/myart/${encodeURIComponent(
            user.email
          )}`
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
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (artworks.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          You haven’t added any artworks yet 🎨
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Upload your beautiful creations and showcase them to the world.
        </p>
      </div>
    );
  }

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
    if (!currentArtwork || !currentArtwork._id) return;

    try {
      const res = await fetch(
        `https://artverse-server.vercel.app/all-arts/${currentArtwork._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentArtwork),
        }
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const updatedArtwork = await res.json();
      setArtworks((prev) =>
        prev.map((art) =>
          art._id === updatedArtwork._id ? { ...art, ...updatedArtwork } : art
        )
      );

      handleCloseModal();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your artwork has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update artwork.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this artwork?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://artverse-server.vercel.app/all-arts/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        setArtworks((prev) => prev.filter((art) => art._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your artwork has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the artwork.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <motion.div
              key={artwork._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 w-full"
            >
              {/* Artwork Image */}
              <div className="relative overflow-hidden h-52 sm:h-56 md:h-60">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent truncate">
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
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
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
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && currentArtwork && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[90%] max-w-lg shadow-xl border border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-yellow-400 mb-4 text-center">
              Update Artwork
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 text-gray-900 dark:text-gray-100"
            >
              <input
                type="text"
                name="image"
                value={currentArtwork.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <input
                type="text"
                name="title"
                value={currentArtwork.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <input
                type="text"
                name="category"
                value={currentArtwork.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <input
                type="text"
                name="medium"
                value={currentArtwork.medium}
                onChange={handleChange}
                placeholder="Medium / Tools"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <textarea
                name="description"
                value={currentArtwork.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <input
                type="text"
                name="dimensions"
                value={currentArtwork.dimensions}
                onChange={handleChange}
                placeholder="Dimensions"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <input
                type="number"
                name="price"
                value={currentArtwork.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              />
              <select
                name="visibility"
                value={currentArtwork.visibility}
                onChange={handleChange}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 border rounded-lg"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg"
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
