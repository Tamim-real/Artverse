import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        className="w-16 h-16 border-4 border-t-transparent border-purple-600 rounded-full animate-spin"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.p
        className="mt-4 text-gray-700 font-medium text-lg tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading Artverse...
      </motion.p>
    </div>
  );
};

export default Loading;
