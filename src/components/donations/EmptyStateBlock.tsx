import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Share } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyStateBlock = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <Card className="max-w-2xl mx-auto bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mx-auto mb-6 w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Donation Journey Begins
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You haven't received any donations yet, but your journey's just beginning. 
            Share your project with potential donors to start receiving support.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button className="gap-2" size="lg">
              <Share size={18} />
              Share My Project
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/submit-project">Edit Project</Link>
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Tips to Get Funded:</h3>
            <ul className="text-left max-w-md mx-auto text-gray-600 dark:text-gray-400">
              <li className="mb-2 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Share your project on social media with friends and family
              </li>
              <li className="mb-2 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Add more details and images to make your project stand out
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Create regular updates to keep potential donors engaged
              </li>
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyStateBlock;
