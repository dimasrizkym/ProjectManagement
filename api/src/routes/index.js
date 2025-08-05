import { Router } from "express";
import authenticationRoutes from "./authenticationRoutes.js";

const route = Router();
route.use("/auth", authenticationRoutes);

export default route;
