import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Edit, Github, Linkedin, LogOut, Share, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import NewProjectModal from "../components/NewProjectModal";
import PageWrapper from "../components/PageWrapper";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useToast } from "../hooks/use-toast";
import { useLoader } from "../context/LoaderContext";


// Mock data for initial development
const mockUserData = {
  fullName: "Kelvin Mukaria",
  username: "kelvinmukaria",
  avatarUrl: "/placeholder.svg",
  joinedAt: "April 2025",
  walletAddress: "GDZJHM7G5MWQXLRKXDGBFTM7JT2BT564CJLWCAU2FRPXGEYYRLDNWXLY",
  bio: "Student passionate about blockchain technology and decentralized finance.",
  projects: [
    { 
      id: "1", 
      title: "Decentralized Learning Platform", 
      description: "A platform that connects students with mentors using blockchain.", 
      status: "active",
      fundingGoal: 5000,
      currentFunding: 3200,
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      university: "Blockchain University",
      studentAvatar: "/placeholder.svg",
      studentName: "Kelvin Mukaria",
      mediaUrls: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
      ],
      category: "Education",
      createdAt: "2024-04-01",
      updatedAt: "2024-04-10",
      walletAddress: "GDZJHM7G5MWQXLRKXDGBFTM7JT2BT564CJLWCAU2FRPXGEYYRLDNWXLY",
      tags: ["Blockchain", "Education"],
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      objectives: "",
      deliverables: "",
      deadline: "",
      target_amount: 5000,
      current_amount: 3200
    },
    { 
      id: "2", 
      title: "Crypto Education App", 
      description: "Mobile application that teaches users about cryptocurrencies.", 
      status: "pending",
      fundingGoal: 2000,
      currentFunding: 100,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      university: "Crypto Academy",
      studentAvatar: "/placeholder.svg",
      studentName: "Kelvin Mukaria",
      mediaUrls: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
      ],
      category: "Mobile App",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-20",
      walletAddress: "GDZJHM7G5MWQXLRKXDGBFTM7JT2BT564CJLWCAU2FRPXGEYYRLDNWXLY",
      tags: ["Crypto", "Education"],
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      objectives: "",
      deliverables: "",
      deadline: "",
      target_amount: 2000,
      current_amount: 0
    },
    { 
      id: "3", 
      title: "Student Loan DApp", 
      description: "Decentralized application for student loans.", 
      status: "completed",
      fundingGoal: 10000,
      currentFunding: 10000,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      university: "DeFi Institute",
      studentAvatar: "/placeholder.svg",
      studentName: "Kelvin Mukaria",
      mediaUrls: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      ],
      category: "Finance",
      createdAt: "2024-02-01",
      updatedAt: "2024-02-15",
      walletAddress: "GDZJHM7G5MWQXLRKXDGBFTM7JT2BT564CJLWCAU2FRPXGEYYRLDNWXLY",
      tags: ["DeFi", "Loans"],
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      objectives: "",
      deliverables: "",
      deadline: "",
      target_amount: 10000,
      current_amount: 10000
    }
  ]
};

// Animation variants for staggered children animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Form schema for profile editing
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  bio: z.string().max(300, { message: "Bio must not exceed 300 characters" }).optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-z0-9_-]+$/, { message: "Username can only contain lowercase letters, numbers, underscores, and hyphens" }),
  githubUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  linkedinUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitterUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal(""))
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const PLACEHOLDER_IMG = "https://placehold.co/600x400?text=Project+Image";

// Pagination settings
const PROJECTS_PER_PAGE = 6;

const PLACEHOLDER_PROJECT: Project = {
  id: "",
  title: "",
  description: "",
  status: "pending",
  fundingGoal: 0,
  currentFunding: 0,
  imageUrl: PLACEHOLDER_IMG,
  mediaUrls: [],
  category: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  walletAddress: "",
  objectives: "",
  deliverables: "",
  deadline: "",
  university: "",
  studentAvatar: "",
  studentName: "",
  tags: [],
  githubUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  target_amount: 0,
  current_amount: 0
};


const DonorProfile = () => {
  const { toast } = useToast();
  const { showLoader, hideLoader } = useLoader();
  const [user, setUser] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState<{ open: boolean; project: Project | null }>({ open: false, project: null });
  const [currentPage, setCurrentPage] = useState(1);

  // Setup form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user.fullName,
      bio: user.bio || "",
      username: user.username,
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: ""
    }
  });

  useEffect(() => {
    showLoader("Loading Donor Profile...");
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  // Handle form submission
  const onSubmit = (data: ProfileFormValues) => {
    showLoader("Updating Profile...");
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        fullName: data.fullName,
        username: data.username,
        bio: data.bio || prev.bio
      }));
      setIsEditing(false);
      hideLoader();
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    }, 1200);
  };

  // Pagination logic
  const totalProjects = user.projects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);
  const paginatedProjects = user.projects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  // Handler for viewing project details
  const handleViewProject = (project: Project) => setShowProjectDetails({ open: true, project });

  // Handler for closing modals
  const handleCloseProjectDetails = () => setShowProjectDetails({ open: false, project: null });

  // Function to truncate wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  // Handler for logout action
  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleProjectCreated(_project: Project): void {
        throw new Error("Function not implemented.");
    }

  return (
    <PageWrapper>
      <div className="container max-w-5xl mx-auto py-10 px-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Profile Header Section */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-100/60 via-indigo-100/60 to-transparent dark:from-slate-900/80 dark:via-indigo-950/80 dark:to-transparent rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8"
          >
            <Avatar className="h-32 w-32 ring-4 ring-primary ring-offset-2 shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback>{user.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.fullName}</h1>
              <p className="text-muted-foreground text-lg">@{user.username}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">Member since {user.joinedAt}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 hover:bg-primary/10 transition"
              >
                <Edit className="h-5 w-5" />
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary/10 transition"
              >
                <Share className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard title="Projects Funded" value={user.projects.length} icon="📁" />
              <StatsCard
                title="Funding Total"
                value={user.projects.reduce((sum, project) => sum + project.currentFunding, 0)}
                prefix="$"
                icon="💰"
              />
              <StatsCard title="Joined" value={user.joinedAt} isText icon="📅" />
            </div>
          </motion.section>

          {/* Edit Profile Form */}
          {isEditing && (
            <motion.section
              variants={itemVariants}
              className="bg-card rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Username */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be your public @username
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description about yourself (max 300 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Socials */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Github className="h-5 w-5 text-muted-foreground" />
                              <Input placeholder="https://github.com/username" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Linkedin className="h-5 w-5 text-muted-foreground" />
                              <Input placeholder="https://linkedin.com/in/username" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="twitterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>X (Twitter)</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Twitter className="h-5 w-5 text-muted-foreground" />
                              <Input placeholder="https://twitter.com/username" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </motion.section>
          )}

          {/* My Projects Section */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Previously Funded projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{ 
                    ...project, 
                    imageUrl: project.imageUrl || PLACEHOLDER_IMG,
                    target_amount: project.fundingGoal,
                    current_amount: project.currentFunding,
                    objectives: project.objectives ?? ""
                  }}
                  onView={() => handleViewProject({
                    ...project, 
                    target_amount: project.fundingGoal, 
                    current_amount: project.currentFunding,
                    objectives: project.objectives ?? ""
                  })}
                />
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </Button>
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </motion.section>

          {/* Security & Account Info */}
          <motion.section variants={itemVariants} className="bg-card rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6">Security & Account Info</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Connected Wallet</h3>
                <p className="font-mono text-sm bg-muted p-2 rounded mt-1">
                  {truncateAddress(user.walletAddress)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Login</h3>
                <p className="text-sm">Today at 10:45 AM</p>
              </div>
              <div className="pt-6 border-t">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full md:w-auto"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </motion.section>
        </motion.div>
        {/* New Project Modal */}
        {showNewProjectModal && (
        <NewProjectModal
            isOpen={showNewProjectModal}
            onClose={() => setShowNewProjectModal(false)}
            onProjectCreated={handleProjectCreated}
            defaultWalletAddress={user.walletAddress}
        />
        )}
        {/* Project Details Modal */}
        {showProjectDetails.open && showProjectDetails.project && (
        <ProjectDetailsModal
            isOpen={showProjectDetails.open}
            project={{ ...PLACEHOLDER_PROJECT, ...showProjectDetails.project }}
            onClose={handleCloseProjectDetails}
        />
        )}
      </div>
    </PageWrapper>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  prefix?: string;
  isText?: boolean;
}

const StatsCard = ({ title, value, icon, prefix = "", isText = false }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isText ? value : prefix + value.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

// Project Card Component
export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  fundingGoal: number;
  currentFunding: number;
  imageUrl: string;
  mediaUrls: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  walletAddress: string;
  studentAvatar: string;
  studentName: string;
  university: string;
  tags?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  objectives: string;
  deliverables: string;
  deadline: string;
  target_amount: number;
  current_amount: number;
}


interface ProjectCardProps {
  project: Project;
  onView: () => void;
}

const ProjectCard = ({ project, onView }: ProjectCardProps) => {
  const percentFunded = (project.currentFunding / project.fundingGoal) * 100;

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img
          src={project.imageUrl || PLACEHOLDER_IMG}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={
              project.status === "active" ? "default" :
                project.status === "completed" ? "secondary" : "outline"
            }
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Progress</span>
            <span className="font-medium">${project.currentFunding} / ${project.fundingGoal}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min(percentFunded, 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onView}>View</Button>
      </CardFooter>
    </Card>
  );
};

export default DonorProfile;
