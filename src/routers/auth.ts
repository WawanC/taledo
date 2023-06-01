import { Router } from "express";
import * as authController from "../controllers/auth";
import passport from "passport";
import isAuth from "../middlewares/is-auth";

const authRouter = Router();

authRouter.post("/register", isAuth, authController.register);

authRouter.get("/me", isAuth, authController.getMe);

export default authRouter;
