import { Router } from "express";
import userRoutes from "./UserRoutes";
import authRoutes from "./AuthRoutes";
import { AuthMiddleware } from "../middlewares";
import { Role } from "../database/models/User";

const appRoutes = Router();

const auth = new AuthMiddleware();

appRoutes.use(
  "/users",
  auth.verifyToken,
  auth.verifyRoles([Role.ADMIN, Role.SUPERADMIN]),
  userRoutes
);
appRoutes.use("/auth", authRoutes);

export default appRoutes;
