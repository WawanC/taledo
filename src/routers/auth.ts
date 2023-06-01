import { Router } from "express";
import * as authController from "../controllers/auth";
import isAuth from "../middlewares/is-auth";
import { registerAuthValidator } from "../validators/auth";
import isValid from "../middlewares/is-valid";

const authRouter = Router();

authRouter.post(
  "/register",
  registerAuthValidator,
  isValid,
  authController.registerUser
);

authRouter.get("/me", isAuth, authController.getMe);

export default authRouter;
