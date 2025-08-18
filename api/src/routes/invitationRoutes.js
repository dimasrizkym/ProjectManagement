import { Router } from "express";
import {
  cancelInvitation,
  confirmInvitation,
  getSentInvitations,
  myInvitations,
  sendInvitation,
} from "../controllers/InvitationController.js";

const route = Router();

route.get("/:projectId/get-sent-invitation/", getSentInvitations);
route.delete("/:invitationId/cancel-invitation", cancelInvitation);
route.post("/send", sendInvitation);
route.get("/my-invitations", myInvitations);
route.post("/confirm", confirmInvitation);

export default route;
