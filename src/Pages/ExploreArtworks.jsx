import React, { useState, useMemo, useEffect } from "react";
import { useLoaderData } from "react-router";
import ArtCard from "../Components/ArtCard";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"; // আইকন নিশ্চিত করুন
import { Fade } from "react-awesome-reveal";

const ExploreArtworks = () => {
  const data = useLoaderData() || []; // ডাটা না থাকলে এম্পটি অ্যারে
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // টেস্ট করার জন্য ৬টি করে দিলাম

  // ফিল্টার লজিক
  const filteredArtworks = useMemo(() => {
    return data.filter((art) => {
      const matchesTitle = art.title?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || art.category === category;
      return matchesTitle && matchesCategory;
    });
  }, [query, category, data]);

  // পেজিনেশন ক্যালকুলেশন
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  // পেজ চেঞ্জ হলে উপরে স্ক্রল হবে
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // সার্চ বা ফিল্টার করলে আবার প্রথম পেজে ফিরে যাবে
  useEffect(() => {
    setCurrentPage(1);
  }, [query, category]);

  return (
    <div className="min-h-screen py-24 px-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Explore Artworks
      </h1>

      {/* Search & Filter Bar */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center w-full sm:w-2/3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-black transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-transparent text-gray-800 outline-none text-sm"
          />
        </div>

        <div className="flex items-center w-full sm:w-1/3 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-black transition-all">
          <Filter size={18} className="text-gray-400 mr-2" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent text-gray-800 outline-none text-sm cursor-pointer"
          >
            <option value="All">All Categories</option>
            {[...new Set(data.map(item => item.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Section */}
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto min-h-[400px]">
        {currentItems.length > 0 ? (
          <Fade cascade damping={0.05} triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((art) => (
                <ArtCard key={art._id} art={art} />
              ))}
            </div>
          </Fade>
        ) : (
          <div className="text-center text-gray-500 py-20 text-xl font-medium">
            No artworks found! 🎨
          </div>
        )}
      </div>

      {/* Pagination Controls - Fixed Logic */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-gray-300 disabled:opacity-30 hover:bg-gray-100 transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  currentPage === index + 1
                    ? "bg-black text-white shadow-lg scale-110"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-gray-300 disabled:opacity-30 hover:bg-gray-100 transition-all active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreArtworks;