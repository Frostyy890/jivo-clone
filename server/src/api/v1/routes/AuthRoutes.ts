import { AuthController } from "../controllers";
import { Router } from "express";

const authRoutes = Router();
const authController = new AuthController();

authRoutes
  .post("/login", authController.login.bind(authController))
  .post("/refresh", authController.refresh.bind(authController))
  .post("/register", authController.register.bind(authController))
  .post("/logout", authController.logout.bind(authController));

export default authRoutes;
