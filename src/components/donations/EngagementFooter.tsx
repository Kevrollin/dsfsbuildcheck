import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Share, MessageSquare } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import ThankDonorsModal from "./ThankDonorsModal";

const EngagementFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleShareClick = () => {
    // In a real app, you'd get the actual project URL
    const projectUrl = `${window.location.origin}/project/123`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(projectUrl)
        .then(() => {
          toast({
            title: "Link copied!",
            description: "Project link has been copied to clipboard",
            duration: 3000,
          });
        })
        .catch(() => {
          toast({
            title: "Copy failed",
            description: "Please copy the URL manually",
            variant: "destructive",
          });
        });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-blue-50 dark:bg-gray-800 border-blue-100 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Engage With Your Donors
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Keep the momentum going! Share your project with more people and thank those 
              who have already supported you.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleShareClick} 
                className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Share size={18} />
                Share My Project
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={openModal} 
                variant="secondary" 
                className="w-full sm:w-auto gap-2"
              >
                <MessageSquare size={18} />
                Thank Donors
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      
      <ThankDonorsModal isOpen={isModalOpen} onClose={closeModal} />
    </motion.div>
  );
};

export default EngagementFooter;