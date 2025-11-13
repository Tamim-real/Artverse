import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const AddArtwork = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      image: e.target.image.value,
      title: e.target.title.value,
      category: e.target.category.value,
      medium: e.target.medium.value,
      description: e.target.description.value,
      dimensions: e.target.dimensions.value,
      price: e.target.price.value,
      visibility: e.target.visibility.value,
      created_at: new Date(),
      created_by: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
    };

    fetch("https://artverse-server.vercel.app/all-arts", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    e.target.reset();
    toast.success("Artwork added! Check Explore Artwork");
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-25 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-2xl space-y-5 transition-colors duration-500"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 bg-clip-text text-transparent mb-6">
          Add New Artwork
        </h2>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            required
            placeholder="Enter artwork image URL"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter artwork title"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          >
            <option value="">Select a category</option>
            <option value="Portrait">Portrait</option>
            <option value="Abstract">Abstract</option>
            <option value="Landscape">Landscape</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Street Art">Street Art</option>
            <option value="Photography">Photography</option>
            <option value="Mixed Media">Mixed Media</option>
          </select>
        </div>

        {/* Medium / Tools */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Medium / Tools
          </label>
          <select
            name="medium"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          >
            <option value="">Select medium / tools</option>
            <option value="Oil Painting">Oil Painting</option>
            <option value="Acrylic Painting">Acrylic Painting</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Charcoal">Charcoal</option>
            <option value="Digital / Photoshop">Digital / Photoshop</option>
            <option value="Digital / Procreate">Digital / Procreate</option>
            <option value="3D / Blender">3D / Blender</option>
            <option value="Photography / DSLR">Photography / DSLR</option>
          </select>
        </div>

        {/* Description */}
       <div>
  <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
    Description
  </label>
  <textarea
    name="description"
    placeholder="Write a short description about your artwork"
    rows="3"  // reduced from 4 to 3
    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
  />
</div>

        {/* Dimensions */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Dimensions (optional)
          </label>
          <select
            name="dimensions"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          >
            <option value="">Select dimensions</option>
            <option value="8x10 inches">8x10 inches</option>
            <option value="12x16 inches">12x16 inches</option>
            <option value="18x24 inches">18x24 inches</option>
            <option value="24x36 inches">24x36 inches</option>
            <option value="30x40 inches">30x40 inches</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="Custom Size">Custom Size</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Price (optional)
          </label>
          <input
            type="number"
            name="price"
            placeholder="e.g., 1200"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
            Visibility
          </label>
          <select
            name="visibility"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#38bdf8] outline-none transition-colors duration-300"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              User Name
            </label>
            <input
              type="text"
              readOnly
              value={user.displayName}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-900 dark:text-gray-100">
              User Email
            </label>
            <input
              type="email"
              readOnly
              value={user.email}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            Add Artwork
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtwork;
