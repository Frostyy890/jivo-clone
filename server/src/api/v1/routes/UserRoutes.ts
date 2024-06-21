import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";
import { permissions } from "../../../config/Permissions";
import { ValidateRequest } from "../middlewares";
import { createUserSchema, updateUserSchema } from "../validations/UserValidations";

const userController = new UserController();
const auth = new AuthMiddleware();

const userRoutes = Router();

userRoutes
  .get("/", userController.findAll.bind(userController))
  .get("/:id", userController.findById.bind(userController))
  .post("/", ValidateRequest(createUserSchema), userController.create.bind(userController))
  .patch("/:id", ValidateRequest(updateUserSchema), userController.update.bind(userController))
  .delete(
    "/:id",
    auth.verifyPermission(permissions.basic.delete),
    userController.delete.bind(userController)
  );

export default userRoutes;
