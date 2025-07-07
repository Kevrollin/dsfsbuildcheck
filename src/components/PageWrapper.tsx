import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900 relative"
    >
      {!isAuthPage && (
        <div className="fixed inset-0 -z-10 opacity-10 dark:opacity-20">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern"></div>
          
          {/* Stars pattern in dark mode */}
          <div className="absolute inset-0 hidden dark:block">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite alternate`
                }}
              />
            ))}
          </div>
          
          {/* Gradient orbs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
      )}
      
      {children}
    </motion.main>
  );
};

export default PageWrapper;
