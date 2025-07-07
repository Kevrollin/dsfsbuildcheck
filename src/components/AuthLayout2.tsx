import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { ThemeToggle } from "../context/ThemeProvider";

interface AuthLayout2Props {
  children: React.ReactNode;
}

const AuthLayout2: React.FC<AuthLayout2Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center p-6 px-96 bg-white dark:bg-gray-800 shadow-md">
        <a
          href="https://getdsfs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </a>
        <ThemeToggle />
      </div>

      {/* Welcome Message */}
      <div className="p-6 text-center bg-gradient-to-br from-blue-600 to-blue-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Welcome to DSFS</h2>
          <p className="text-lg">
            Join the future of decentralized student funding. Secure, transparent, and empowering.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col justify-center items-center p-6">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout2;