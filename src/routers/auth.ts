import { Router } from "express";
import * as authController from "../controllers/auth";
import { loginAuthValidator, registerAuthValidator } from "../validators/auth";
import isValid from "../middlewares/is-valid";
import passportAuthLocal from "../middlewares/passport-auth-local";

const authRouter = Router();

authRouter.post(
  "/register",
  registerAuthValidator,
  isValid,
  authController.registerUser
);

authRouter.post(
  "/login",
  loginAuthValidator,
  isValid,
  passportAuthLocal,
  authController.loginUser
);

authRouter.get("/me", authController.getMe);

export default authRouter;
