import { Button } from "@/components/ui/button";
import type { Collabolators } from "@/types/type";
import { Trash, Users } from "lucide-react";
import { useEffect } from "react";

interface ListCollabolatorsProps {
  collabolators: Collabolators[];
  getProject: () => void;
}

const ListCollabolators = ({
  collabolators,
  getProject,
}: ListCollabolatorsProps) => {
  useEffect(() => {
    console.log(collabolators);
  }, []);

  return (
    <div className="border p-5 col-span-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-1 items-center">
          <Users size={16} />
          <span>Collabolators</span>
        </div>
      </div>

      <div className="space-y-3 pt-3">
        {collabolators.map((collaborator, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="capitalize">{collaborator.name}</p>
              <p>{collaborator.email}</p>
            </div>
            <div>
              <Button variant={"secondary"} size={"sm"}>
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
