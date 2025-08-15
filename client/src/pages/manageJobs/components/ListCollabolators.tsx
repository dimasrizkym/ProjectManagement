import { Button } from "@/components/ui/button";
import apiClient from "@/config/axios";
import type { Collabolators } from "@/types/type";
import { Trash, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { email, set } from "zod";
import SendInvitations from "./SendInvitations";

interface ListCollabolatorsProps {
  collabolators: Collabolators[];
  getProject: () => void;
}

const ListCollabolators = ({
  collabolators,
  getProject,
}: ListCollabolatorsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { projectId } = useParams();

  const handleDelete = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await apiClient.delete(
        `/projects/${projectId}/delete-collabolator`,
        {
          data: {
            email,
          },
        }
      );

      setLoading(false);
      toast.success(data.message);
      getProject();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 col-span-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-1 items-center">
          <Users size={16} />
          <span>Collabolators</span>
        </div>
        <div>
          <SendInvitations />
        </div>
      </div>

      <div className="space-y-3 pt-3">
        {collabolators.map((collabolator, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="capitalize">{collabolator.name}</p>
              <p>{collabolator.email}</p>
            </div>
            <div>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => handleDelete(collabolator.email)}
                disabled={loading}
              >
                <Trash className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCollabolators;
