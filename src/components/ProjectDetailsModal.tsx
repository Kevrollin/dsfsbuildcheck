import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Target,
  Wallet,
  X
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import type { Project } from "../pages/Projects";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
  const isMobile = useIsMobile();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate funding progress percentage
  const progressPercentage = project.current_amount 
    ? Math.min(Math.round((project.current_amount / project.target_amount) * 100), 100)
    : 0;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-500 text-white dark:bg-green-600';
      case 'pending': return 'bg-yellow-500 text-white dark:bg-yellow-600';
      case 'rejected': return 'bg-red-500 text-white dark:bg-red-600';
      case 'completed': return 'bg-blue-500 text-white dark:bg-blue-600';
      default: return 'bg-gray-500 text-white dark:bg-gray-600';
    }
  };

  // Format wallet address to show only first and last characters
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="project-modal sm:max-w-4xl p-0 gap-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/95 dark:backdrop-blur-xl shadow-xl">
        <DialogTitle className="text-lg sm:text-xl font-semibold p-4 border-b border-gray-200 dark:border-gray-700">
          {project.title || "Project Details"}
        </DialogTitle>

        {/* Close button in the top-right corner */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 shadow-sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2"} gap-0`}>
          {/* Left side - Project Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative h-full"
          >
            <div className={`aspect-video ${isMobile ? "" : "md:aspect-square"} w-full h-full overflow-hidden ${isMobile ? "" : "md:rounded-l-xl"}`}>
              {project.mediaUrls && project.mediaUrls[0] ? (
                <img 
                  src={project.mediaUrls[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20">
                  <AlertCircle className="text-blue-500 dark:text-blue-400 h-20 w-20 opacity-50" />
                </div>
              )}
              
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 dark:opacity-80"></div>
            </div>
            
            {/* Status badge */}
            <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)} shadow-md`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            
            {/* Project title on mobile */}
            {isMobile && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <Badge variant="outline" className="bg-white/10 text-white mb-2 border-white/20">
                  {project.category}
                </Badge>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                  {project.title}
                </h2>
              </div>
            )}
          </motion.div>
          
          {/* Right side - Project Details */}
          <motion.div 
            className="p-4 md:p-6 flex flex-col max-h-[70vh] md:max-h-[90vh] overflow-y-auto custom-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {!isMobile && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors dark:border-blue-800 dark:text-blue-300">
                    {project.category}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(project.createdAt)}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-blue-800 dark:text-blue-400">
                  {project.title}
                </h2>
              </div>
            )}
            
            {/* Student info - conditionally rendered if available */}
            {typeof project.studentName === "string" && project.studentName && (
              <div className="flex items-center mb-4 p-3 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg backdrop-blur-sm">
                <Avatar className="h-9 w-9 border-2 border-white dark:border-gray-700 ring-2 ring-blue-500/10 shadow-sm">
                  <AvatarImage src={project.studentAvatar} alt={project.studentName} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {project.studentName?.charAt(0) || "S"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-medium text-blue-900 dark:text-blue-300">{project.studentName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.university}</p>
                </div>
              </div>
            )}
            
            <div className="mb-4 p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-300">Project Description</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-300">Objectives</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">{project.objectives}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-50/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-300">Deliverables</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">{project.deliverables}</p>
              </div>
            </div>
            
            <div className="mb-4 bg-blue-50/70 dark:bg-blue-900/20 p-3 rounded-lg backdrop-blur-sm border border-blue-100/50 dark:border-blue-800/30">
              <h3 className="font-medium mb-1 flex items-center text-blue-700 dark:text-blue-300">
                <Target className="h-4 w-4 mr-2" />
                Funding Goal
              </h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
                  {formatCurrency(project.target_amount)}
                </span>
                {project.current_amount !== undefined && (
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {formatCurrency(project.current_amount)} raised
                  </span>
                )}
              </div>
              {project.current_amount !== undefined && (
                <>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                    <motion.div 
                      className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    {progressPercentage}% complete
                  </div>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50/70 dark:bg-gray-800/40 p-3 rounded-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-300">Deadline</h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                  {formatDate(project.deadline)}
                </div>
              </div>
              
              {project.walletAddress && (
                <div className="bg-gray-50/70 dark:bg-gray-800/40 p-3 rounded-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-300">Wallet</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                    <Wallet className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                    <span className="font-mono">{formatWalletAddress(project.walletAddress)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <motion.button 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="h-4 w-4" />
                </motion.button>
                <motion.button 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 hover:text-green-500 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-md">
                  Support Project <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;

