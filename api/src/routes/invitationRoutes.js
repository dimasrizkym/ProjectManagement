import { Router } from "express";
import {
  cancelInvitation,
  getSentInvitations,
  sendInvitation,
} from "../controllers/InvitationController.js";

const route = Router();

route.get("/:projectId/get-sent-invitation/", getSentInvitations);
route.delete("/:invitationId/cancel-invitation", cancelInvitation);
route.post("/send", sendInvitation);

export default route;
