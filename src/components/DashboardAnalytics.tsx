import React from "react";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "../components/ui/chart";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface AnalyticsProps {
  totalFunded: string;
  pendingPayouts: string;
  availableBalance: string;
  transactionHistory: {
    month: string;
    received: number;
    sent: number;
  }[];
}

const DashboardAnalytics: React.FC<AnalyticsProps> = ({
  totalFunded,
  pendingPayouts,
  availableBalance,
  transactionHistory
}) => {
  // Chart config for styling the bars
  const chartConfig = {
    received: {
      label: "Received",
      color: "#3b82f6" // Blue
    },
    sent: {
      label: "Sent",
      color: "#10b981" // Green
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">Funding Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <motion.div whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(59,130,246,0.08)' }} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3 sm:p-4 transition-all duration-300 w-full">
          <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium">Total Funded</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalFunded} XLM</p>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(251,191,36,0.08)' }} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-3 sm:p-4 transition-all duration-300 w-full">
          <p className="text-yellow-600 dark:text-yellow-400 text-xs sm:text-sm font-medium">Pending Payouts</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{pendingPayouts} XLM</p>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(16,185,129,0.08)' }} className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg p-3 sm:p-4 transition-all duration-300 w-full">
          <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">Available Balance</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{availableBalance} XLM</p>
        </motion.div>
      </div>
      
      <div>
        <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white mb-2 sm:mb-4">Transaction History</h3>
        <div className="h-48 sm:h-64">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionHistory} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={12}
                  tick={{ fill: "#888" }}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="received"
                  className="fill-blue-500 dark:fill-blue-400"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="sent"
                  className="fill-green-500 dark:fill-green-400"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardAnalytics;
