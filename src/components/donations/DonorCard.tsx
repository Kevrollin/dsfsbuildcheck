import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { DonorData } from "../../pages/Donations";

interface DonorCardProps {
  donor: DonorData;
  index: number;
}

const DonorCard = ({ donor, index }: DonorCardProps) => {
  const getInitials = (name: string) => {
    if (name === "Anonymous") return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const isTopDonor = index === 0;
  const fallbackInitials = getInitials(donor.donorName);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center mb-4">
            <Avatar className="h-14 w-14 border-2 border-blue-100 dark:border-blue-900">
              <AvatarImage src={donor.avatarUrl} alt={donor.donorName} />
              <AvatarFallback className="bg-blue-500 text-white">
                {fallbackInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{donor.donorName}</h3>
                {isTopDonor && (
                  <Badge className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-white">
                    Top Donor
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {donor.donatedAt}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">${donor.amount}</span>
            </div>
            
            {donor.message && (
              <div className="mt-3 pt-3 border-t border-blue-100 dark:border-gray-700">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  "{donor.message}"
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DonorCard;
