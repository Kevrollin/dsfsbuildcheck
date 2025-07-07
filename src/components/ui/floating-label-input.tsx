import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, error, className = "", ...props }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = props.value !== undefined ? Boolean(props.value) : Boolean(inputRef.current?.value);

  return (
    <div className={`relative w-full mb-3 ${className}`}>
      <input
        {...props}
        ref={inputRef}
        className={`peer w-full px-3 pt-5 pb-1 h-10 bg-white dark:bg-gray-900 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 text-sm text-gray-900 dark:text-white placeholder-transparent focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? "border-red-400" : ""}`}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        autoComplete={props.autoComplete || "off"}
      />
      <motion.label
        htmlFor={props.id}
        className="absolute left-3 top-1.5 text-xs text-gray-500 dark:text-gray-400 pointer-events-none origin-left select-none"
        initial={false}
        animate={focused || hasValue ? { y: 0, scale: 0.85, x: 0, color: "#6366f1" } : { y: 16, scale: 1, x: 0, color: "#6b7280" }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        style={{
          background: "inherit",
          padding: "0 0.15rem",
          zIndex: 2,
        }}
      >
        {label}
      </motion.label>
      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute left-0 -bottom-4 text-xs text-red-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={false}
        animate={focused ? { boxShadow: "0 0 0 2px #6366f1aa" } : { boxShadow: "none" }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default FloatingLabelInput; 