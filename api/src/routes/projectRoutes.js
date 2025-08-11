import { Router } from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectController.js";

const route = Router();

route.get("/", getAllProjects);
route.post("/", createProject);

export default route;
