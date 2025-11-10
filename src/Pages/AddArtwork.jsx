import React, { useState } from "react";


const AddArtwork = () => {
 
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex justify-center items-center py-22 px-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5 text-gray-100"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent mb-6">
          Add New Artwork
        </h2>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="Enter artwork image URL"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter artwork title"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Portrait, Abstract, Landscape"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Medium / Tools</label>
          <input
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            placeholder="e.g., Oil, Acrylic, Digital, Photoshop"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description about your artwork"
            rows="4"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Dimensions (optional)</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            placeholder="e.g., 24x36 inches"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price (optional)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 1200"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Visibility</label>
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">User Name</label>
            <input
              type="text"
              readOnly
              value={"Anonymous"}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">User Email</label>
            <input
              type="email"
              readOnly
              value={ "No Email"}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-gray-400"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <button type="submit" className="btn btn-warning w-full md:w-auto px-8 py-3 rounded-xl text-black font-semibold hover:scale-105 transition-transform duration-300">
            Add Artwork
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtwork;
