import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import ArtCard from "../Components/ArtCard";
import { Search, Filter } from "lucide-react";

const ExploreArtworks = () => {
  const data = useLoaderData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  
  const categories = useMemo(() => {
    const unique = new Set(data.map((art) => art.category));
    return ["All", ...Array.from(unique)];
  }, [data]);

 
  const filteredArtworks = useMemo(() => {
    return data.filter((art) => {
      const matchesTitle = art.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || art.category === category;
      return matchesTitle && matchesCategory;
    });
  }, [query, category, data]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-24 px-6">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
        Explore Artworks
      </h1>

      
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-lg">
        
        <div className="flex items-center w-full sm:w-2/3 bg-white/20 rounded-xl px-3 py-2 shadow-inner focus-within:ring-2 ring-indigo-300 transition-all">
          <Search size={18} className="text-gray-200 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-transparent text-white placeholder-gray-300 outline-none text-sm sm:text-base"
          />
        </div>

        
        <div className="flex items-center w-full sm:w-1/3 bg-white/20 rounded-xl px-3 py-2 shadow-inner focus-within:ring-2 ring-indigo-300 transition-all">
          <Filter size={18} className="text-gray-200 mr-2" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent text-white outline-none text-sm sm:text-base cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900 text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

     
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((art) => <ArtCard key={art._id} art={art} />)
        ) : (
          <div className="col-span-full text-center text-gray-200 mt-10 text-lg">
            No artworks found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
