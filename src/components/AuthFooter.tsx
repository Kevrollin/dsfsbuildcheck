import React from "react";
import { Link } from "react-router-dom";

const AuthFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link to="/privacy" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              Terms of Service
            </Link>
            <Link to="/help" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              How To
            </Link>
            <Link to="/about" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
              How It Works
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            &copy; {currentYear} DSFS. All rights reserved.
          </p>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Built on Stellar Blockchain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
