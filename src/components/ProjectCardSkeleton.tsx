import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ProjectCardSkeleton = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <Card className="project-card h-full flex flex-col border border-gray-200 dark:border-gray-800">
        {/* Card Header */}
        <div className="p-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div>
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-2 w-24" />
            </div>
          </div>
          <Skeleton className="h-2 w-12" />
        </div>
        
        {/* Media Content - Fixed height for consistency */}
        <div className="w-full aspect-video relative">
          <Skeleton className="absolute inset-0" />
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-2/3 mb-4" />
          
          {/* Tags */}
          <div className="mt-auto flex space-x-2 mb-4">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-14 rounded-full" />
          </div>
          
          {/* Action Bar */}
          <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between">
            <div className="flex space-x-4">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-14" />
            </div>
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCardSkeleton;
