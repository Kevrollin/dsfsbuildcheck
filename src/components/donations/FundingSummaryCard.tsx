import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";

interface FundingSummaryCardProps {
  totalRaised: number;
  totalDonors: number;
  averageDonation: number;
  targetAmount: number;
}

const FundingSummaryCard = ({
  totalRaised,
  totalDonors,
  averageDonation,
  targetAmount,
}: FundingSummaryCardProps) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedAverage, setAnimatedAverage] = useState(0);
  const [animatedDonors, setAnimatedDonors] = useState(0);
  const progressPercentage = Math.min(Math.round((totalRaised / targetAmount) * 100), 100);

  useEffect(() => {
    // Animate counting up
    const totalDuration = 1500; // ms
    const intervalTotal = 20;
    const stepTotal = Math.ceil(totalRaised / (totalDuration / intervalTotal));
    const stepAverage = averageDonation / (totalDuration / intervalTotal);
    const stepDonors = totalDonors / (totalDuration / intervalTotal);

    const timer = setInterval(() => {
      setAnimatedTotal(prev => {
        const next = prev + stepTotal;
        return next >= totalRaised ? totalRaised : next;
      });
      
      setAnimatedAverage(prev => {
        const next = prev + stepAverage;
        return next >= averageDonation ? averageDonation : next;
      });
      
      setAnimatedDonors(prev => {
        const next = prev + stepDonors;
        return next >= totalDonors ? totalDonors : next;
      });
    }, intervalTotal);

    return () => clearInterval(timer);
  }, [totalRaised, averageDonation, totalDonors]);

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-xl font-semibold mb-1">Funding Summary</h2>
        <p className="text-blue-100 text-sm">Track your project's financial progress</p>
      </div>
      
      <div className="p-6 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Total Raised</p>
            <motion.p 
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              ${Math.round(animatedTotal).toLocaleString()}
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">of ${targetAmount.toLocaleString()} goal</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Supporters</p>
            <motion.p 
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(animatedDonors)}
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">amazing donors</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Average Donation</p>
            <motion.p 
              className="text-3xl font-bold text-purple-600 dark:text-purple-400"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              ${animatedAverage.toFixed(2)}
            </motion.p>
            <p className="text-xs text-gray-400 mt-1">per donor</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Funding Progress</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FundingSummaryCard;
