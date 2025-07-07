import { motion } from "framer-motion";
import { Bookmark, Eye, Heart, Share2,DollarSign } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";

interface Comment {
  user: string;
  text: string;
}
interface StudentDetails {
  name: string;
  degree?: string;
  university?: string;
  avatarUrl?: string;
}

export interface ProjectCardProps {
  projectName: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
  location?: string;
  tags?: string[];
  likesCount: number;
  comments?: Comment[];
  student?: StudentDetails;
  buttonText?: string;
  onClick?: () => void;
  fundingCurrent: number;
  fundingTarget: number;
}


const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  description,
  imageUrl,
  timestamp,
  location,
  tags = [],
  likesCount = 0,
  student,
  onClick,
  fundingCurrent,
  fundingTarget,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setCurrentLikes(liked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Share functionality would open here");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === "approved") return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (lowerTag === "pending") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (lowerTag === "rejected") return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    if (lowerTag === "completed") return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    if (lowerTag === "medical") return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    if (lowerTag === "technology") return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
    if (lowerTag === "business") return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
    if (lowerTag === "environment") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
    if (lowerTag === "education") return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    if (lowerTag === "arts") return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
    if (lowerTag === "social") return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const navigate = useNavigate();
  const progress = fundingTarget > 0 ? Math.min((fundingCurrent / fundingTarget) * 100, 100) : 0;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card 
        className="project-card h-full flex flex-col cursor-pointer shadow-sm hover:shadow-lg dark:shadow-gray-900/20 dark:bg-gray-800/80 dark:border-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 group"
        onClick={onClick}
      >
        {/* Card Header */}
        <div className="p-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-gray-800 shadow-sm">
              <AvatarImage src={student?.avatarUrl} alt={student?.name || projectName} />
              <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {student ? getInitials(student.name) : projectName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-1">{student?.name || projectName}</p>
              {location && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{location}</p>
              )}
            </div>
          </div>
          
          <span className="text-xs text-gray-400 dark:text-gray-500">{timestamp}</span>
        </div>
        
        {/* Media Content - Fixed aspect ratio for consistent height */}
        <div className="aspect-video w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-xl">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={projectName} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20">
              <span className="text-4xl font-bold text-blue-300 dark:text-blue-700">{projectName[0]}</span>
            </div>
          )}
          
          {/* Overlay with view button */}
          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100 transition-all duration-300">
            <Button variant="secondary" size="sm" className="bg-white/90 text-gray-800 hover:bg-white dark:bg-gray-800/90 dark:text-gray-100 dark:hover:bg-gray-800 shadow-md rounded-full">
              <Eye className="h-4 w-4 mr-1" /> View Details
            </Button>
          </div>
        </div>
        
        {/* Project Info - Fixed height content for consistency */}
        <div className="p-4 flex-grow flex flex-col min-h-[150px]">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1 text-base sm:text-lg">{projectName}</h3>
          
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
            {description}
          </p>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-auto mb-3 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={cn("text-2xs px-2 py-0.5 rounded-full font-medium", getTagColor(tag))}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Funding Progress Bar */}
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="relative w-full cursor-pointer group mt-2">
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="top"
                  align="center"
                  className="px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-50"
                  sideOffset={6}
                >
                  {fundingCurrent && fundingTarget
                    ? `${fundingCurrent} / ${fundingTarget} XLM`
                    : "No funding data"}
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          {/* Action Buttons */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-3">
            <div className="flex space-x-3">
              <button 
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm" 
                onClick={handleLike}
              >
                <Heart 
                  className={cn("h-4 w-4 mr-1", 
                    liked ? "fill-red-500 text-red-500" : ""
                  )} 
                />
                {currentLikes}
              </button>
              
              <button 
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm" 
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>

              <button 
  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
  onClick={(e) => {
    e.stopPropagation();
    navigate("/donate"); // replace with the actual donate route if different
  }}
>
  <DollarSign className="h-4 w-4 mr-1" />
  Fund
</button>

            </div>
            
            <button 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" 
              onClick={handleSave}
            >
              <Bookmark 
                className={cn("h-5 w-5", 
                  saved ? "fill-blue-500 text-blue-500" : ""
                )} 
              />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
