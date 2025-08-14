import Header from "@/components/ui/header";
import { Link, useParams } from "react-router";
import DetailProject from "./components/DetailProject";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Collabolators, Project } from "@/types/type";
import LoadingPage from "@/components/loading-page";
import ListCollabolators from "./components/ListCollabolators";

const ManageJobsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [collabolators, setCollabolators] = useState<Collabolators[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getProject = async () => {
    try {
      const { data } = await apiClient.get(`/projects/${projectId}`);
      console.log(data.project);
      setProject(data.project);
      setCollabolators(data.project.collabolators);
      setLoading(false);
    } catch (error: any) {
      //   console.log(error);
      setLoading(false);
      toast.error(error?.response.data.message);
    }
  };

  const getJobs = async () => {
    try {
      const { data } = await apiClient.get(`/jobs/${projectId}/get-jobs`);
      console.log(data);
      //   setLoading(false);
    } catch (error: any) {
      //   console.log(error);
      setLoading(false);
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    getProject();
    getJobs();
  }, []);

  if (loading) return <LoadingPage />;
  return (
    <div>
      <Header
        title="Manage Jobs"
        children={<Link to={`/projects`}>Back</Link>}
      />
      <div>
        <DetailProject project={project} />
        <div className="grid grid-cols-12">
          <ListCollabolators
            getProject={getProject}
            collabolators={collabolators}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageJobsPage;
