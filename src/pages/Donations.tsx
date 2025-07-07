import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import DonorsList from "../components/donations/DonorsList";
import EmptyStateBlock from "../components/donations/EmptyStateBlock";
import EngagementFooter from "../components/donations/EngagementFooter";
import FundingProgressChart from "../components/donations/FundingProgressChart";
import FundingSummaryCard from "../components/donations/FundingSummaryCard";
import { useToast } from "../hooks/use-toast";
import { useLoader } from "../context/LoaderContext";

// Mock data for demonstration
const mockDonationData = {
  totalRaised: 3250,
  totalDonors: 42,
  averageDonation: 77.38,
  targetAmount: 5000,
  donors: [
    {
      id: "1",
      avatarUrl: "/placeholder.svg",
      donorName: "Alex Johnson",
      amount: 500,
      message: "This project is amazing! Keep up the great work.",
      donatedAt: "2 hours ago",
    },
    {
      id: "2",
      avatarUrl: "/placeholder.svg",
      donorName: "Anonymous",
      amount: 100,
      donatedAt: "1 day ago",
    },
    {
      id: "3",
      avatarUrl: "/placeholder.svg",
      donorName: "Maria Garcia",
      amount: 250,
      message: "Happy to support student innovation!",
      donatedAt: "3 days ago",
    },
    {
      id: "4",
      avatarUrl: "/placeholder.svg",
      donorName: "David Kim",
      amount: 75,
      donatedAt: "1 week ago",
    },
    {
      id: "5",
      avatarUrl: "/placeholder.svg",
      donorName: "Sarah Miller",
      amount: 300,
      message: "Looking forward to seeing the final product!",
      donatedAt: "2 weeks ago",
    },
  ],
  weeklyDonations: [
    { day: "Mon", amount: 500 },
    { day: "Tue", amount: 350 },
    { day: "Wed", amount: 200 },
    { day: "Thu", amount: 0 },
    { day: "Fri", amount: 600 },
    { day: "Sat", amount: 1200 },
    { day: "Sun", amount: 400 },
  ],
};

// Define interface for donor data
export interface DonorData {
  id: string;
  avatarUrl: string;
  donorName: string;
  amount: number;
  message?: string;
  donatedAt: string;
}

const DonationsPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [hasDonations, setHasDonations] = useState<boolean>(true);
  const [donationData] = useState(mockDonationData);
  useToast();

  // Simulate checking for donations
  useEffect(() => {
    showLoader("Loading Donations...");
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  useEffect(() => {
    // In a real app, this would come from an API
    setHasDonations(donationData.donors.length > 0);
  }, [donationData.donors.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageWrapper>
      <motion.div
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          variants={itemVariants}
        >
          Your Donations Dashboard
        </motion.h1>

        {hasDonations ? (
          <>
            <motion.div variants={itemVariants}>
              <FundingSummaryCard
                totalRaised={donationData.totalRaised}
                totalDonors={donationData.totalDonors}
                averageDonation={donationData.averageDonation}
                targetAmount={donationData.targetAmount}
              />
            </motion.div>

            <motion.div
              className="my-8"
              variants={itemVariants}
            >
              <FundingProgressChart
                weeklyData={donationData.weeklyDonations}
                targetAmount={donationData.targetAmount}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold mb-4">Recent Donors</h2>
              <DonorsList donors={donationData.donors} />
            </motion.div>

            <motion.div
              className="mt-12"
              variants={itemVariants}
            >
              <EngagementFooter />
            </motion.div>
          </>
        ) : (
          <motion.div variants={itemVariants}>
            <EmptyStateBlock />
          </motion.div>
        )}
      </motion.div>
    </PageWrapper>
  );
};

export default DonationsPage;
