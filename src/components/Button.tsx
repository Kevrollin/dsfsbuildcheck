import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  className = "",
  icon
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${className}`}
    >
      <span className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </span>
    </motion.button>
  );
};

export default Button;