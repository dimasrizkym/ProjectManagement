import { Router } from "express";
import { sendInvitation } from "../controllers/InvitationController.js";

const route = Router();

route.post("/send", sendInvitation);

export default route;
