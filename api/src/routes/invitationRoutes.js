import { Router } from "express";
import {
  getSentInvitations,
  sendInvitation,
} from "../controllers/InvitationController.js";

const route = Router();

route.get("/:projectId/get-sent-invitation/", getSentInvitations);
route.post("/send", sendInvitation);

export default route;
