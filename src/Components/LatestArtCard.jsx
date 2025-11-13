import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Link } from "react-router";

export default function LatestArtCard({ art, onView }) {
  const [likes, setLikes] = useState(art?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function toggleLike(e) {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setLikes((l) => (next ? l + 1 : Math.max(0, l - 1)));
      return next;
    });
  }

  return (
    <>
      <article
        className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
        aria-label={`Artwork card: ${art.title} by ${art.created_by}`}
      >
        <div className="relative h-52 sm:h-64 md:h-72 overflow-hidden bg-gray-50 dark:bg-gray-700">
          <img
            src={art.image}
            alt={`${art.title} by ${art.created_by}`}
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-200">
            {art.category}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold leading-tight text-gray-900 dark:text-gray-100 truncate">
                {art.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                {art.created_by}
              </p>
            </div>

            <div className="flex flex-col items-end text-right text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{art?.likes?.length || 0}</span>
              <span className="mt-0.5">likes</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Link 
              to={`/all-arts/${art._id}`}
              onClick={() => {
                setShowDetails(true);
                if (onView) onView(art);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm text-sm font-medium transition-transform transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Eye className="h-4 w-4 " />
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
