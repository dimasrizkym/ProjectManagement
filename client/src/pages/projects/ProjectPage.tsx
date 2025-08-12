import Header from "@/components/ui/header";
import FormProject from "./components/FormProject";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Project } from "@/types/type";
import {
  ArrowRight,
  Box,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import DeleteProject from "./components/DeleteProject";
import { Link } from "react-router";

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const { data } = await apiClient.get("/projects");
      setProjects(data.projects);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get projects. Please try again.");
    }
  };

  const borderTheme = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-teal-500";
      case "low":
        return "border-l-sky-500";
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <Header title="My Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-dashed rounded-lg shadow-sm hover:shadow-lg transition-all p-5 space-y-5 flex justify-center items-center">
          <FormProject getProjects={getProjects} />
        </div>

        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative ${borderTheme(
              project.priority
            )} p-5 bg-white border-4 border-t-0 border-r-0 border-b-0 rounded-tl-none rounded-bl-none rounded-lg shadow-sm hover:shadow-lg transition-all group`}
          >
            <div className="absolute top-16 right-10">
              <Box size={100} className="text-muted-foreground opacity-10" />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">
                {project.title}
              </h3>
              <span className="text-sm text-gray-500">#{index + 1}</span>
            </div>

            <div className="text-sm text-gray-700 space-y-2 mt-3">
              {/* Priority */}
              <div className="flex items-center gap-2">
                <Flag size={16} />
                <span className="font-medium">Priority</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">
                  {project.priority}
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-x-2 flex-wrap">
                <ClipboardList size={16} />
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-full text-xs bg-secondary capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* due date */}
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span className="font-medium">Due Date:</span>{" "}
                {format(new Date(project.dueDate), "EEEE, dd MMM yyyy", {
                  locale: id,
                })}
              </div>

              {/* Status Completed */}
              <div className="flex items-center gap-x-2">
                <CheckCircle size={16} />
                <span className="font-medium">Status:</span>
                <span
                  className={`${
                    project.completed ? "text-green-700" : "text-cyan-700"
                  } text-sm`}
                >
                  {project.completed ? "Completed" : "In Progress"}
                </span>
              </div>

              {/* options */}
              <div className="flex items-center justify-between">
                <div>
                  <FormProject project={project} getProjects={getProjects} />
                  <DeleteProject
                    projectId={project._id}
                    getProjects={getProjects}
                  />
                </div>
                <div className="text-right">
                  <Link
                    to={`/manage-jobs/${project._id}`}
                    className="hover:underline transition-all text-blue-800 flex gap-x-1  items-center"
                  >
                    Manage Job
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
