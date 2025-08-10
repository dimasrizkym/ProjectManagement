import { Router } from "express";
import authenticationRoutes from "./authenticationRoutes.js";
import tagRoutes from "./tagRoutes.js";

const route = Router();
route.use("/auth", authenticationRoutes);
route.use("/tags", tagRoutes);

export default route;
