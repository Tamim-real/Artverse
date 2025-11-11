import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";


const AddArtwork = () => {

const {user} = use(AuthContext)
console.log(user);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      image : e.target.image.value,
      title : e.target.title.value,
      category: e.target.category.value,
      medium: e.target.medium.value,
      description: e.target.description.value,
      dimensions: e.target.dimensions.value,
      price : e.target.price.value,
      visibility : e.target.visibility.value,
      created_at: new Date(),
      created_by: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email
      

    }
    
fetch("http://localhost:3000/all-arts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex justify-center items-center py-22 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5 text-gray-100"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] bg-clip-text text-transparent mb-6">
          Add New Artwork
        </h2>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="url"
            name="image"
            
            
            required
            placeholder="Enter artwork image URL"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            
            
            required
            placeholder="Enter artwork title"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
  name="category"
  
  
  required
  className="w-full p-3 rounded-xl bg-white text-gray-800 border border-white/20 focus:ring-2 focus:ring-[#38bdf8] outline-none"
>
  <option value="">Select a category</option>
  <option value="Portrait">Portrait</option>
  <option value="Abstract">Abstract</option>
  <option value="Landscape">Landscape</option>
  <option value="Digital Art">Digital Art</option>
  <option value="Street Art">Street Art</option>
</select>

        </div>

        {/* Medium / Tools */}
        <div>
          <label className="block mb-1 font-semibold">Medium / Tools</label>
          <input
            type="text"
            name="medium"
           
            
            placeholder="e.g., Oil, Acrylic, Digital, Photoshop"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
           
            
            placeholder="Write a short description about your artwork"
            rows="4"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Dimensions */}
        <div>
          <label className="block mb-1 font-semibold">Dimensions (optional)</label>
          <input
            type="text"
            name="dimensions"
           
            
            placeholder="e.g., 24x36 inches"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price (optional)</label>
          <input
            type="number"
            name="price"
            
            
            placeholder="e.g., 1200"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-[#38bdf8] outline-none"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block mb-1 font-semibold">Visibility</label>
          <select
  name="visibility"
  
  
  className="w-full p-3 rounded-xl bg-white text-gray-800 border border-white/20 focus:ring-2 focus:ring-[#38bdf8] outline-none"
>
  <option value="Public">Public</option>
  <option value="Private">Private</option>
</select>

        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">User Name</label>
            <input
              type="text"
              readOnly
              value={user.displayName}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-gray-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">User Email</label>
            <input
              type="email"
              name="email"
              readOnly
              value={user.email}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn btn-warning w-full md:w-auto px-8 py-3 rounded-xl text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            Add Artwork
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtwork;
