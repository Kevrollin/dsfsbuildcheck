import { motion } from "framer-motion";
import { FileText, Home, Info, Menu, User, Users, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "../context/ThemeProvider";
import { useIsMobile } from "../hooks/use-mobile";

const DonorNavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click or Esc
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => {
    if (isMobile && isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 z-40 w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-lg border-b border-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav aria-label="Donor navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Tagline */}
            <div className="flex items-center space-x-3 min-w-0">
              <NavLink
                to="/"
                className="flex-shrink-0 font-extrabold text-2xl md:text-3xl text-blue-700 dark:text-blue-400 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                aria-label="Home"
                onClick={closeMobileMenu}
              >
                DSFS
              </NavLink>
              <div className="hidden md:block h-8 w-1 bg-yellow-500 rounded-full"></div>
              <div className="hidden md:block text-base text-gray-700 dark:text-gray-200 leading-tight font-medium truncate max-w-xs">
                Decentralised Student <br /> Funding System
              </div>
            </div>
            {/* Mobile Logo and Tagline Centered */}
            <div className="md:hidden flex flex-col items-center min-w-0">
              <NavLink
                to="/"
                className="font-extrabold text-lg text-blue-700 dark:text-blue-400 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                aria-label="Home"
                onClick={closeMobileMenu}
              >
                DSFS
              </NavLink>
              
            </div>
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-4" role="menubar">
              <li><ThemeToggle /></li>
              <li>
                <NavLink
                  to="/dashboard-d"
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                    }`
                  }
                  onClick={closeMobileMenu}
                  tabIndex={0}
                  role="menuitem"
                >
                  <Home className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donate"
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                    }`
                  }
                  onClick={closeMobileMenu}
                  tabIndex={0}
                  role="menuitem"
                >
                  <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Donate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/students"
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                    }`
                  }
                  onClick={closeMobileMenu}
                  tabIndex={0}
                  role="menuitem"
                >
                  <Users className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Explore Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                    }`
                  }
                  onClick={closeMobileMenu}
                  tabIndex={0}
                  role="menuitem"
                >
                  <Info className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                    }`
                  }
                  onClick={closeMobileMenu}
                  tabIndex={0}
                  role="menuitem"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Profile
                </NavLink>
              </li>
            </ul>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <NavLink
                to="/profile"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                onClick={closeMobileMenu}
                aria-label="Profile"
              >
                <User className="h-6 w-6" aria-hidden="true" />
              </NavLink>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
                aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 space-y-2 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-800 backdrop-blur-md"
              role="menu"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/dashboard-d"
                    className={({ isActive }) =>
                      `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                          : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`
                    }
                    onClick={closeMobileMenu}
                    tabIndex={0}
                    role="menuitem"
                  >
                    <Home className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/donate"
                    className={({ isActive }) =>
                      `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                          : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`
                    }
                    onClick={closeMobileMenu}
                    tabIndex={0}
                    role="menuitem"
                  >
                    <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Donate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/students"
                    className={({ isActive }) =>
                      `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                          : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`
                    }
                    onClick={closeMobileMenu}
                    tabIndex={0}
                    role="menuitem"
                  >
                    <Users className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Explore Students
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                          : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`
                    }
                    onClick={closeMobileMenu}
                    tabIndex={0}
                    role="menuitem"
                  >
                    <Info className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow"
                          : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-300"
                      }`
                    }
                    onClick={closeMobileMenu}
                    tabIndex={0}
                    role="menuitem"
                    aria-label="Profile"
                  >
                    <User className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" /> Profile
                  </NavLink>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default DonorNavBar;
