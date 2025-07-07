import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NewProjectModal from "../components/NewProjectModal";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { Button } from "../components/ui/button";
import { useLoader } from "../context/LoaderContext";
import PageWrapper from "../components/PageWrapper";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "../components/ui/select";

// Types for project data based on API specs
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
  // Adding these missing fields
  target_amount: number;
  current_amount: number;
  objectives: string;
  deliverables: string;
  deadline: string;
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Learning Assistant",
    description: "An intelligent tutoring system that adapts to individual student learning styles using machine learning algorithms.",
    status: "approved",
    fundingGoal: 8000,
    currentFunding: 5200,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"],
    category: "Technology",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    walletAddress: "GDZJHM7G5MWQXLRKXDGBFTM7JT2BT564CJLWCAU2FRPXGEYYRLDNWXLY",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    studentName: "Alex Chen",
    university: "MIT",
    tags: ["AI", "Education", "Machine Learning"],
    githubUrl: "https://github.com/alexchen/ai-tutor",
    linkedinUrl: "https://linkedin.com/in/alexchen",
    twitterUrl: "https://twitter.com/alexchen",
    objectives: "Create an AI tutor that helps students learn at their own pace",
    deliverables: "Web application with mobile app",
    deadline: "2024-06-30",
    target_amount: 8000,
    current_amount: 5200
  },
  {
    id: "2",
    title: "Sustainable Campus Energy System",
    description: "A renewable energy solution for university campuses using solar panels and smart grid technology.",
    status: "pending",
    fundingGoal: 15000,
    currentFunding: 3200,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"],
    category: "Environment",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-05",
    walletAddress: "GABC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    studentAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    studentName: "Sarah Johnson",
    university: "Stanford University",
    tags: ["Sustainability", "Energy", "Green Tech"],
    githubUrl: "https://github.com/sarahj/solar-campus",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    twitterUrl: "https://twitter.com/sarahj",
    objectives: "Reduce campus carbon footprint by 40%",
    deliverables: "Complete solar installation and monitoring system",
    deadline: "2024-08-15",
    target_amount: 15000,
    current_amount: 3200
  },
  {
    id: "3",
    title: "Mental Health Support Platform",
    description: "A digital platform connecting students with mental health professionals and peer support groups.",
    status: "approved",
    fundingGoal: 6000,
    currentFunding: 6000,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"],
    category: "Medical",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
    walletAddress: "GDEF9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA",
    studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    studentName: "Maria Rodriguez",
    university: "UCLA",
    tags: ["Mental Health", "Wellness", "Support"],
    githubUrl: "https://github.com/mariar/mental-health-app",
    linkedinUrl: "https://linkedin.com/in/mariarodriguez",
    twitterUrl: "https://twitter.com/mariar",
    objectives: "Provide accessible mental health support for students",
    deliverables: "Mobile app with web dashboard",
    deadline: "2024-05-20",
    target_amount: 6000,
    current_amount: 6000
  },
  {
    id: "4",
    title: "Blockchain-Based Academic Credentials",
    description: "A decentralized system for issuing and verifying academic credentials using blockchain technology.",
    status: "completed",
    fundingGoal: 12000,
    currentFunding: 12000,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80"],
    category: "Technology",
    createdAt: "2023-11-15",
    updatedAt: "2024-01-30",
    walletAddress: "GGHI111122223333444455556666777788889999",
    studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    studentName: "David Kim",
    university: "UC Berkeley",
    tags: ["Blockchain", "Education", "Credentials"],
    githubUrl: "https://github.com/davidk/blockchain-credentials",
    linkedinUrl: "https://linkedin.com/in/davidkim",
    twitterUrl: "https://twitter.com/davidk",
    objectives: "Create tamper-proof academic credential system",
    deliverables: "Blockchain platform and verification tools",
    deadline: "2024-03-15",
    target_amount: 12000,
    current_amount: 12000
  },
  {
    id: "5",
    title: "Community Garden Initiative",
    description: "Establishing community gardens on campus to promote sustainable agriculture and food security.",
    status: "pending",
    fundingGoal: 4000,
    currentFunding: 1800,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"],
    category: "Environment",
    createdAt: "2024-02-20",
    updatedAt: "2024-02-22",
    walletAddress: "GJKL555566667777888899990000111122223333",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    studentName: "Emma Wilson",
    university: "University of Washington",
    tags: ["Agriculture", "Community", "Sustainability"],
    githubUrl: "https://github.com/emmaw/garden-project",
    linkedinUrl: "https://linkedin.com/in/emmawilson",
    twitterUrl: "https://twitter.com/emmaw",
    objectives: "Create sustainable food sources for campus community",
    deliverables: "Three community gardens with irrigation systems",
    deadline: "2024-07-10",
    target_amount: 4000,
    current_amount: 1800
  },
  {
    id: "6",
    title: "Student Entrepreneurship Hub",
    description: "A co-working space and mentorship program for student entrepreneurs to develop their business ideas.",
    status: "approved",
    fundingGoal: 20000,
    currentFunding: 8500,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    mediaUrls: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"],
    category: "Business",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
    walletAddress: "GMNO999900001111222233334444555566667777",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    studentName: "James Thompson",
    university: "NYU",
    tags: ["Entrepreneurship", "Business", "Innovation"],
    githubUrl: "https://github.com/jamest/startup-hub",
    linkedinUrl: "https://linkedin.com/in/jamesthompson",
    twitterUrl: "https://twitter.com/jamest",
    objectives: "Support 50+ student startups annually",
    deliverables: "Co-working space with mentorship programs",
    deadline: "2024-09-30",
    target_amount: 20000,
    current_amount: 8500
  }
];

const ProjectsPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [allProjects, setAllProjects] = useState<Project[]>(mockProjects);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [publicProjects, setPublicProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [search, setSearch] = useState<string>("");

  // Fetch user's wallet address
  useEffect(() => {
    const wallet = localStorage.getItem("wallet_address");
    if (wallet) setWalletAddress(wallet);
  }, []);

  // Load projects on component mount
  useEffect(() => {
    showLoader("Loading Projects...");
    // Simulate API call delay
    setTimeout(() => {
      setAllProjects(mockProjects);
      hideLoader();
    }, 1000);
  }, [hideLoader, showLoader]);

  // Split projects into "My Projects" and "Public Projects"
  useEffect(() => {
    if (!walletAddress) {
      setMyProjects([]);
      setPublicProjects(allProjects);
      return;
    }
    setMyProjects(allProjects.filter(p => p.walletAddress === walletAddress));
    setPublicProjects(allProjects.filter(p => p.walletAddress !== walletAddress));
  }, [allProjects, walletAddress]);

  // Filtering and sorting for public projects
  const filteredPublicProjects = publicProjects
    .filter(project =>
      (categoryFilter === "all" || project.category === categoryFilter) &&
      (statusFilter === "all" || project.status === statusFilter) &&
      (search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "amount") {
        return (b.current_amount || 0) - (a.current_amount || 0);
      }
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });

  // Filtering and sorting for my projects
  const filteredMyProjects = myProjects
    .filter(project =>
      (categoryFilter === "all" || project.category === categoryFilter) &&
      (statusFilter === "all" || project.status === statusFilter) &&
      (search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "amount") {
        return (b.current_amount || 0) - (a.current_amount || 0);
      }
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return 0;
    });

  // Delete project
  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://studybae.online:8000/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted!");
      setAllProjects(prev => prev.filter(p => p.id !== projectId));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-6 sm:py-8 min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8">
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900 dark:from-blue-400 dark:to-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              onClick={() => setIsNewProjectModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full px-6 shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Project
            </Button>
          </motion.div>
        </div>

        {/* Filter & Sort Controls - refined as a column with professional Select dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full sm:w-auto"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="amount">Amount Raised</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* My Projects Section */}
        <section className="mb-10">
          {filteredMyProjects.length === 0 ? (
            <motion.div 
              className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">No projects yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first project to get started</p>
              <Button 
                onClick={() => setIsNewProjectModalOpen(true)}
                variant="outline"
                className="bg-white dark:bg-gray-900"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredMyProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <ProjectCard
                        projectName={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        timestamp={new Date(project.createdAt).toLocaleDateString()}
                        location={undefined}
                        tags={[project.category, project.status]}
                        likesCount={Math.floor(Math.random() * 50)}
                        student={{
                          name: "You",
                          degree: "Student",
                          university: "",
                          avatarUrl: ""
                        }}
                        buttonText="View Details"
                        onClick={() => handleOpenProjectDetails(project)}
                        fundingCurrent={project.currentFunding}
                        fundingTarget={project.fundingGoal}
                      />
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Public Projects Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Explore Other Projects</h2>
          
          {filteredPublicProjects.length === 0 ? (
            <motion.div 
              className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">No public projects available</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back later for updates</p>
            </motion.div>
          ) : (
            <>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredPublicProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <ProjectCard
                        projectName={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        timestamp={new Date(project.createdAt).toLocaleDateString()}
                        location={undefined}
                        tags={[project.category, project.status]}
                        likesCount={Math.floor(Math.random() * 100)}
                        student={{
                          name: "Student",
                          degree: "Student",
                          university: "",
                          avatarUrl: ""
                        }}
                        buttonText="View Details"
                        onClick={() => handleOpenProjectDetails(project)}
                        fundingCurrent={project.currentFunding}
                        fundingTarget={project.fundingGoal}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* New Project Modal */}
        <AnimatePresence>
          {isNewProjectModalOpen && (
            <NewProjectModal
              isOpen={isNewProjectModalOpen}
              onClose={() => setIsNewProjectModalOpen(false)}
              onProjectCreated={(project) => {
                setAllProjects(prev => [project, ...prev]);
                toast.success("Project created successfully");
              }}
              defaultWalletAddress={walletAddress}
            />
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {isDetailsModalOpen && selectedProject && (
            <ProjectDetailsModal
              project={selectedProject}
              isOpen={isDetailsModalOpen}
              onClose={() => setIsDetailsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
