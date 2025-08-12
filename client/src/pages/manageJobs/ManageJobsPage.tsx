import Header from "@/components/ui/header";
import { Link, useParams } from "react-router";
import DetailProject from "./components/DetailProject";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Project } from "@/types/type";
import LoadingPage from "@/components/loading-page";

const ManageJobsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProject = async () => {
    try {
      const { data } = await apiClient.get(`/projects/${projectId}`);
      //   console.log(data);
      setProject(data.project);
      setLoading(false);
    } catch (error: any) {
      //   console.log(error);
      setLoading(false);
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    getProject();
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
      </div>
    </div>
  );
};

export default ManageJobsPage;
