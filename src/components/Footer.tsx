import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="font-bold text-xl text-blue-700 dark:text-blue-400 mr-2">DSFS</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Stellar</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Decentralized Students Funding System powered by Stellar blockchain technology.
              </p>
              <div className="space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="text-sm w-full justify-between group"
                  size="sm"
                >
                  <a
                    href="https://developers.stellar.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn about Stellar
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Resources Column */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company Column */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Connect Column */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                &copy; {currentYear} DSFS. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Terms of Service
                </Link>
                <Link to="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            {/* Added "Built on Stellar Blockchain" text centered at bottom */}
            <div className="flex justify-center mt-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Built on Stellar Blockchain
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
