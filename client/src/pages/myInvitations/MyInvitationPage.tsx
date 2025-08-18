import LoadingPage from "@/components/loading-page";
import MetaItem from "@/components/meta-item";
import Header from "@/components/ui/header";
import apiClient from "@/config/axios";
import type { Invitations } from "@/types/type";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Text, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReadMore from "./components/ReadMore";
import { Button } from "@/components/ui/button";

const MyInvitationPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invitations[]>([]);

  const getInvitations = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(`/invitation/my-invitations`);
      setInvitations(data.invitations);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvitations();
  }, []);

  if (loading) return <LoadingPage />;

  const trimText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const handleAction = async (id: string, status: string) => {
    setIsSubmited(true);
    try {
      const { data } = await apiClient.post(`/invitation/confirm`, {
        invitationId: id,
        status: status,
      });

      toast.success(data.message);
      getInvitations();
      setIsSubmited(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
      setIsSubmited(false);
    }
  };

  return (
    <div>
      <Header title="My Invitations" />
      <div className="grid grid-cols-3">
        {invitations.map((invitation, index) => (
          <div
            key={index}
            className="border rounded-md p-3 space-y-1 border-l-2 border-l-teal-600"
          >
            <h4 className="font-semibold">{invitation.project.title}</h4>
            <MetaItem
              label="Sender"
              content={invitation.sender.name}
              icon={<User size={16} />}
            />
            <MetaItem
              label="Due Date"
              icon={<Calendar size={16} />}
              content={
                <p>
                  {format(
                    new Date(invitation.project.dueDate),
                    "EEEE, dd MMMM yyyy",
                    { locale: id }
                  )}
                </p>
              }
            />
            <MetaItem
              label="Description"
              icon={<Text size={16} />}
              isBlock
              isBold
              content={
                <>
                  <p>{trimText(invitation.project.description, 100)}</p>
                </>
              }
            />
            <div className="flex justify-end mb-3">
              {invitation.project.description.length > 100 && (
                <ReadMore description={invitation.project.description} />
              )}
            </div>
            <div className="flex justify-between gap-x-1">
              <Button
                size="sm"
                className="w-3/5"
                onClick={() => handleAction(invitation._id, "accepted")}
                disabled={isSubmited}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-2/5"
                onClick={() => handleAction(invitation._id, "declined")}
                disabled={isSubmited}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInvitationPage;
