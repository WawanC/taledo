import { Router } from "express";
import * as authController from "../controllers/auth";
import { loginAuthValidator, registerAuthValidator } from "../validators/auth";
import isValid from "../middlewares/is-valid";
import passportAuthLocal from "../middlewares/passport-auth-local";
import isAuth from "../middlewares/is-auth";
import passport from "passport";

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : process.env.CLIENT_URL_DEV;

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

authRouter.get("/me", isAuth, authController.getMe);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account"
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: clientUrl,
    failureRedirect: `${clientUrl}/login`
  })
);

authRouter.post("/logout", isAuth, authController.logoutUser);

export default authRouter;
