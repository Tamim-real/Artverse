import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const SAMPLE_DATA = [
  {
    id: "a1",
    title: "Morning Bloom",
    image:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
    medium: "Digital / Procreate",
    description:
      "A dreamy floral study exploring gradients and soft light — a celebration of color and texture.",
    likes: 42,
    comments: 5,
    artist: { name: "Maya Reed", avatar: "https://i.pravatar.cc/60?img=12" },
    tags: ["floral", "pastel", "digital"],
  },
  {
    id: "a2",
    title: "Urban Echoes",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    medium: "35mm / Film",
    description:
      "Moody black & whites captured in a late-night city stroll — texture-forward and cinematic.",
    likes: 87,
    comments: 12,
    artist: { name: "Arif Khan", avatar: "https://i.pravatar.cc/60?img=22" },
    tags: ["street", "bw", "cinematic"],
  },
  {
    id: "a3",
    title: "Cerulean Drift",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    medium: "Acrylic on Canvas",
    description:
      "Bold brushwork and layered blues that push the boundaries between abstraction and horizon.",
    likes: 56,
    comments: 9,
    artist: { name: "Sofia Malik", avatar: "https://i.pravatar.cc/60?img=32" },
    tags: ["abstract", "blue", "acrylic"],
  },
  {
    id: "a4",
    title: "Golden Horizon",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    medium: "Oil on Canvas",
    description:
      "Warm tones meet soft strokes — inspired by the calm of early dawn by the sea.",
    likes: 73,
    comments: 15,
    artist: { name: "Rafi Ahmed", avatar: "https://i.pravatar.cc/60?img=18" },
    tags: ["sunrise", "oil", "warm"],
  },
];

export default function CommunityHighlights() {
  const [liked, setLiked] = useState(() => new Set());

  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-10">
        Community Highlights
      </h1>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SAMPLE_DATA.map((item) => (
          <motion.article
            key={item.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
          >
            
            <div className="flex items-center gap-3 p-4">
              <img
                src={item.artist.avatar}
                alt={item.artist.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.artist.name}
                </h3>
                <p className="text-xs text-gray-500">{item.medium}</p>
              </div>
            </div>

            
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-h-[400px] object-contain bg-gray-50 dark:bg-gray-700"
                loading="lazy"
              />
            </div>

            
            <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {item.description}
                </p>

             
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              
              <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 text-gray-600 dark:text-gray-300">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="flex items-center gap-2 hover:text-rose-500 transition-all"
                >
                  <Heart
                    size={18}
                    className={`${
                      liked.has(item.id) ? "text-rose-500 fill-rose-500" : ""
                    }`}
                  />
                  <span className="text-sm">
                    {item.likes + (liked.has(item.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-2 hover:text-blue-500 transition-all">
                  <MessageCircle size={18} />
                  <span className="text-sm">{item.comments}</span>
                </button>

                <button className="flex items-center gap-2 hover:text-green-500 transition-all">
                  <Share2 size={18} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
