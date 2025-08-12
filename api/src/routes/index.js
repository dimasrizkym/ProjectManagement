import { Router } from "express";
import authenticationRoutes from "./authenticationRoutes.js";
import tagRoutes from "./tagRoutes.js";
import projectRoutes from "./projectRoutes.js";
import jobRoutes from "./jobRoutes.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();
route.use("/auth", authenticationRoutes);
route.use("/tags", tagRoutes);
route.use("/projects", verifyToken, projectRoutes);
route.use("/jobs", verifyToken, jobRoutes);

export default route;
