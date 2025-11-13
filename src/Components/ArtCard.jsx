import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Link } from "react-router";

export default function ArtCard({ art, onView }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <article
        className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
        aria-label={`Artwork card: ${art.title} by ${art.created_by}`}>

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
              <span className="mt-0.5">{art?.likes?.length === 1 ? "like" : "likes"}</span>
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
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </Link>
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-gray-300 line-clamp-3">
            {art.description || "No description provided. Add a short blurb to make the card more engaging."}
          </div>
        </div>
      </article>

      {showDetails && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetails(false)}
            aria-hidden="true"
          />

          <motion.dialog
            role="dialog"
            aria-modal="true"
            initial={{ y: 40, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 max-w-3xl w-full rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{art.title}</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">By {art.artist}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Category: {art.category}</p>

                <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                  <strong>Likes:</strong> {art?.likes?.length || 0}
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  {art.longDescription || "This artwork doesn't have an extended description yet."}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Close
                  </button>

                  <a
                    href={art.purchase || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:brightness-95"
                  >
                    Buy / Visit
                  </a>
                </div>
              </div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </>
  );
}
