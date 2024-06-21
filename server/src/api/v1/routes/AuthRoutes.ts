import { AuthController } from "../controllers";
import { Router } from "express";
import { ValidateRequest } from "../middlewares";
import { loginUserSchema, registerUserSchema } from "../validations/UserValidations";

const authRoutes = Router();
const authController = new AuthController();

authRoutes
  .post("/login", ValidateRequest(loginUserSchema), authController.login.bind(authController))
  .post(
    "/register",
    ValidateRequest(registerUserSchema),
    authController.register.bind(authController)
  )
  .post("/refresh", authController.refresh.bind(authController))
  .post("/logout", authController.logout.bind(authController));

export default authRoutes;
