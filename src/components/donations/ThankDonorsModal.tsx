import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ThankDonorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankDonorsModal = ({ isOpen, onClose }: ThankDonorsModalProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a thank you message",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Thank you sent!",
        description: "Your message has been sent to all donors",
      });
      setMessage("");
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-1">Thank Your Donors</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Send a personalized thank you message to everyone who supported your project.
              </p>
              
              <div className="mb-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md 
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-32"
                  placeholder="Write a thank you message to your supporters..."
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSend} 
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Thank You"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThankDonorsModal;
