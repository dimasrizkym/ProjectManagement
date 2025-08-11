import { Router } from "express";
import authenticationRoutes from "./authenticationRoutes.js";
import tagRoutes from "./tagRoutes.js";
import projectRoutes from "./projectRoutes.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();
route.use("/auth", authenticationRoutes);
route.use("/tags", tagRoutes);
route.user("/projects", verifyToken, projectRoutes);

export default route;
