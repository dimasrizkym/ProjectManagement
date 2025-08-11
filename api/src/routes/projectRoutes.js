import { Router } from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
} from "../controllers/projectController.js";

const route = Router();

route.get("/", getAllProjects);
route.post("/", createProject);
route.put("/:projectId/update", updateProject);

export default route;
