import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import apiClient from "@/config/axios";
import type { Invitations } from "@/types/type";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { set } from "zod";

const InvitationBox = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { projectId } = useParams();
  const [invitations, setInvitations] = useState<Invitations[]>([]);

  const getInvitations = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(
        `/invitation/${projectId}/get-sent-invitation`
      );
      setInvitations(data.invitation);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    open && getInvitations();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <MailCheck size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sent Invitations</DialogTitle>
          <DialogDescription asChild>
            {loading ? (
              <Loading />
            ) : (
              <div>
                {invitations.length > 0 ? (
                  invitations.map((invitation, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between border-b py-2"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="capitalize">
                            {invitation.receiver.name}
                          </p>
                          <p>{invitation.receiver.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p>
                            {format(
                              new Date(invitation.createdAt),
                              "EEEE, dd MMMM yyyy",
                              { locale: id }
                            )}
                          </p>
                          <div className="space-x-1 flex justify-end items-center">
                            <Badge className="capitalize">
                              {invitation.status}
                            </Badge>
                            <Badge variant={"destructive"}>Cancel</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <p>No Active Invitations</p>
                  </div>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationBox;
