import e, { Router } from "express";
import {
  login,
  logout,
  register,
  whoami,
} from "../controllers/authenticationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);

route.get("/whoami", verifyToken, whoami);
route.post("/logout", verifyToken, logout);

export default route;
