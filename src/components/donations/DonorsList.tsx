import { motion } from "framer-motion";
import DonorCard from "./DonorCard";
import type { DonorData } from "../../pages/Donations";

interface DonorsListProps {
  donors: DonorData[];
}

const DonorsList = ({ donors }: DonorsListProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {donors.map((donor, index) => (
        <DonorCard
          key={donor.id}
          donor={donor}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default DonorsList;
