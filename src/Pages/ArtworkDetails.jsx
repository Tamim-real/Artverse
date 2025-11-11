import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";

const ArtworkDetails = () => {
    const {user} = use(AuthContext)
  const { id } = useParams(); 
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalArtworks, setTotalArtworks] = useState(null);

  console.log(totalArtworks);
  

  
  useEffect(() => {
    fetch(`http://localhost:3000/all-arts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

useEffect(() => {
  if (user?.email) {
    fetch(`http://localhost:3000/artist-arts/${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Total artworks:", data.totalArtworks);
        setTotalArtworks(data.totalArtworks);
      })
      .catch(err => console.log(err));
  }
}, [user?.email]);



  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/all-arts/like/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      setArtwork({ ...artwork, likes: data.likes });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = async () => {
    try {
      await fetch(`http://localhost:3000/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artwork),
      });
      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading artwork details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6 flex justify-center items-center text-gray-100">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">

       
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover rounded-3xl brightness-95 hover:brightness-110 transition-all duration-500"
            whileHover={{ boxShadow: "0 0 40px rgba(255,255,255,0.5)" }}
          />
        </motion.div>

        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
            {artwork.title}
          </h2>
          <p className="text-gray-300 text-lg">{artwork.description}</p>

          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <p><span className="font-semibold text-gray-200">Medium:</span> {artwork.medium}</p>
            <p><span className="font-semibold text-gray-200">Category:</span> {artwork.category}</p>
            <p><span className="font-semibold text-gray-200">Dimensions:</span> {artwork.dimensions || "N/A"}</p>
          </div>

          
          <div className="flex items-center gap-4 pt-4 border-t border-white/20 mt-6">
            <img
              src={artwork.userPhoto || "https://i.ibb.co/2K3G6D6/default-avatar.png"}
              alt={artwork.artist_name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-300"
            />
            <div>
              <p className="font-semibold text-lg text-white">{artwork.created_by}</p>
              <p className="text-sm text-gray-400">{totalArtworks} artworks</p>
            </div>
          </div>

          
          <div className="flex gap-4 pt-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl transition-all"
            >
              <Heart className="w-5 h-5" /> {artwork.likes || 0} Likes
            </button>
            <button
              onClick={handleFavorite}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-xl transition-all"
            >
              <Star className="w-5 h-5" /> Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
