import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import type { ProjectCardProps } from "../components/ProjectCard";
import PageWrapper from "../components/PageWrapper";
import { useLoader } from "../context/LoaderContext";

// ✅ mockProjects should match ProjectCardProps
const mockProjects: ProjectCardProps[] = [
  {
    projectName: "Smart Irrigation System",
    description: "Automates irrigation using soil moisture sensors and weather data.",
    timestamp: "3 days ago",
    location: "Nairobi",
    likesCount: 10,
    tags: ["Technology", "Approved"],
    student: {
      name: "Alice Mwangi",
      degree: "BSc Computer Science",
      university: "University of Nairobi",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    imageUrl: "https://example.com/project1.jpg",
    fundingCurrent: 60,
    fundingTarget: 100,
  },
  // Add more mock projects here...
];

const ExploreStudents = () => {
  const { showLoader, hideLoader } = useLoader();
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);

  useEffect(() => {
    showLoader("Loading Students...");
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      hideLoader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLoader, hideLoader]);

  return (
    <PageWrapper>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Student Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
      
    </PageWrapper>
  );
};

export default ExploreStudents;
