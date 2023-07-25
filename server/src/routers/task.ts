import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import * as taskController from "../controllers/task";
import { createTaskValidator } from "../validators/task";
import isValid from "../middlewares/is-valid";

const taskRouter = Router();

taskRouter.post(
  "/",
  isAuth,
  createTaskValidator,
  isValid,
  taskController.createTask
);

export default taskRouter;
