import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js";

const route = Router();

route.get("/", getAllProjects);
route.post("/", createProject);
route.put("/:projectId/update", updateProject);
route.delete("/:id/delete", deleteProject);
route.get("/:projectId", getProjectById);

export default route;
