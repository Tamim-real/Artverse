import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Tag, Filter } from "lucide-react";


const SAMPLE_DATA = [
  {
    id: "a1",
    title: "Morning Bloom",
    image:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1",
    category: "Illustration",
    medium: "Digital / Procreate",
    description:
      "A dreamy floral study exploring gradients and soft light — a celebration of color and texture.",
    dimensions: "2000 x 3000 px",
    price: "$120",
    likes: 42,
    artist: { name: "Maya Reed", avatar: "https://i.pravatar.cc/60?img=12" },
    tags: ["floral", "pastel", "digital"],
  },
  {
    id: "a2",
    title: "Urban Echoes",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
    category: "Photography",
    medium: "35mm / Film",
    description:
      "Moody black & whites captured in a late-night city stroll — texture-forward and cinematic.",
    dimensions: "6000 x 4000 px",
    price: "$300",
    likes: 87,
    artist: { name: "Arif Khan", avatar: "https://i.pravatar.cc/60?img=22" },
    tags: ["street", "bw", "cinematic"],
  },
  {
    id: "a3",
    title: "Cerulean Drift",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    category: "Painting",
    medium: "Acrylic on Canvas",
    description:
      "Bold brushwork and layered blues that push the boundaries between abstraction and horizon.",
    dimensions: "30 x 40 in",
    price: "$750",
    likes: 56,
    artist: { name: "Sofia Malik", avatar: "https://i.pravatar.cc/60?img=32" },
    tags: ["abstract", "blue", "acrylic"],
  },
  {
    id: "a4",
    title: "Pocket Botanica",
    image:
      "https://images.unsplash.com/photo-1762699660493-319b6371a99d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Illustration",
    medium: "Ink & Watercolor",
    description:
      "Compact field sketches of found plants with delicate ink outlines and soft washes.",
    dimensions: "1200 x 1800 px",
    price: "$95",
    likes: 31,
    artist: { name: "Rafi Ahmed", avatar: "https://i.pravatar.cc/60?img=45" },
    tags: ["botanical", "sketch", "watercolor"],
  },
  {
    id: "a5",
    title: "Neon Tide",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    category: "Digital",
    medium: "3D / Blender",
    description:
      "Vibrant neon shapes and reflective surfaces — a playful look at synthetic landscapes.",
    dimensions: "3840 x 2160 px",
    price: "$220",
    likes: 102,
    artist: { name: "Lina Chowdhury", avatar: "https://i.pravatar.cc/60?img=52" },
    tags: ["3d", "neon", "render"],
  },
];

const CATEGORIES = ["All", "Illustration", "Photography", "Painting", "Digital"];

export default function CommunityHighlights() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("trending"); // trending | newest | price
  const [liked, setLiked] = useState(() => new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = SAMPLE_DATA.filter((item) => {
      const inCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.join(" ").toLowerCase().includes(q) ||
        item.artist.name.toLowerCase().includes(q);
      return inCategory && matchesQuery;
    });

    if (sortBy === "trending") {
      list = list.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "price") {
      const priceValue = (p) => Number(String(p).replace(/[^0-9.]/g, "")) || 0;
      list = list.sort((a, b) => priceValue(b.price) - priceValue(a.price));
    } // newest not implemented for static data

    return list;
  }, [query, activeCategory, sortBy]);

  function toggleLike(id) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight ">
            Community Highlights
          </h2>
          <p className="mt-1 text-sm ">
            Hand-picked artworks from our community — curated for color, craft, and concept.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search highlights
            </label>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, artist or tags..."
                className="px-3 py-2 w-56 sm:w-72 text-sm outline-none"
              />
              <button
                aria-label="search"
                className="px-3 border-l border-gray-100"
                onClick={() => {}}
                title="Search"
              >
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex gap-2 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm rounded-md border-gray-200 bg-white px-2 py-2"
              aria-label="Sort highlights"
            >
              <option value="trending">Trending</option>
              <option value="price">Price</option>
            </select>

            <button
              className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-200 rounded-md hover:shadow"
              title="Filters"
            >
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>
      </header>

      <nav className="mb-6">
        <ul className="flex gap-3 overflow-auto">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                onClick={() => setActiveCategory(c)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 ${
                  activeCategory === c
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
                aria-pressed={activeCategory === c}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((item) => (
          <motion.article
            layout
            whileHover={{ translateY: -6 }}
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            aria-labelledby={`${item.id}-title`}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />

              <div className="absolute left-3 top-3 flex gap-2 items-center">
                <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-3 py-1 text-xs font-semibold">
                  <Tag size={14} /> {item.category}
                </span>
              </div>

              <button
                onClick={() => toggleLike(item.id)}
                aria-pressed={liked.has(item.id)}
                className="absolute right-3 top-3 bg-white/90 rounded-full p-2 shadow-sm hover:scale-105 focus:outline-none"
                title={liked.has(item.id) ? "Unlike" : "Like"}
              >
                <Heart size={16} className={liked.has(item.id) ? "text-rose-500" : "text-gray-600"} />
              </button>
            </div>

            <div className="p-4">
              <h3 id={`${item.id}-title`} className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{item.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.artist.avatar}
                    alt={item.artist.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.artist.name}</p>
                    <p className="text-xs text-gray-500">{item.medium}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">{item.price}</p>
                  <p className="text-xs text-gray-500">{item.dimensions}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {item.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{item.likes + (liked.has(item.id) ? 1 : 0)}</span> likes
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-gray-500">
          No highlights found. Try adjusting filters or search terms.
        </div>
      )}

      <footer className="mt-8 text-sm text-gray-600 text-center">
        Showing <span className="font-medium text-gray-900">{filtered.length}</span> of {SAMPLE_DATA.length} highlights
      </footer>
    </section>
  );
}
