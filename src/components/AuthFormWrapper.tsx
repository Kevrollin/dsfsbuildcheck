import React from "react";
import { motion } from "framer-motion";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ children, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl px-8 py-10 flex flex-col items-center relative"
      style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
    >
      {title && (
        <div className="mb-6 flex flex-col items-center">
          <span className="text-3xl font-extrabold text-indigo-700 tracking-tight mb-2">{title}</span>
          <div className="w-12 h-1 bg-indigo-500 rounded-full" />
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default AuthFormWrapper; 