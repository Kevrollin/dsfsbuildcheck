import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

interface TransactionProps {
  type: "incoming" | "outgoing";
  amount: string;
  stellarAddress: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  memo?: string;
}

const TransactionCard: React.FC<TransactionProps> = ({
  type,
  amount,
  stellarAddress,
  timestamp,
  status,
  memo
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(59,130,246,0.10)' }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 transition-all duration-300 cursor-pointer w-full overflow-hidden"
    >
      <div className="flex items-center space-x-3 sm:space-x-4 w-full min-w-0">
        <div className={cn(
          "p-1 rounded-full transition-colors duration-300 flex-shrink-0", 
          type === "incoming" 
            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        )}>
          {type === "incoming" ? (
            <ArrowDown className="h-5 w-5" />
          ) : (
            <ArrowUp className="h-5 w-5" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm truncate">
            {type === "incoming" ? "Received" : "Sent"} XLM
          </p>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex flex-wrap space-x-1 items-center min-w-0">
            <span className="truncate max-w-[90px] sm:max-w-[120px]">{shortenAddress(stellarAddress)}</span>
            {memo && <span className="text-xs">({memo})</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center sm:items-end mt-2 sm:mt-0 gap-1 sm:gap-0 w-full sm:w-auto justify-between">
        <p className={cn(
          "font-medium text-xs sm:text-sm whitespace-nowrap",
          type === "incoming" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
        )}>
          {type === "incoming" ? "+" : "-"}{amount} XLM
        </p>
        <div className="flex space-x-2 text-xs items-center">
          <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">{timestamp}</span>
          <span className={cn(
            "px-1 py-0.5 rounded-full text-xs transition-colors duration-300 whitespace-nowrap",
            status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "",
            status === "pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : "",
            status === "failed" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : ""
          )}>
            {status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to shorten Stellar addresses for display
function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export default TransactionCard;
