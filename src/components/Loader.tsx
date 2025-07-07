// src/components/Loader.tsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface LoaderProps {
  show: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 w-full h-full flex flex-col justify-center items-center z-[100] bg-gray-900/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated DSFS logo/text */}
          <motion.div
            className="text-5xl font-extrabold text-blue-500 drop-shadow-lg tracking-widest select-none"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            DSFS
          </motion.div>
          {/* Animated Loading... */}
          <motion.div
            className="mt-6 text-lg text-gray-200 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            {message || "Loading..."}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

