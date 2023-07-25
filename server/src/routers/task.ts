import { Router } from "express";
import isAuth from "../middlewares/is-auth";
import * as taskController from "../controllers/task";
import { createTaskValidator, updateTaskValidator } from "../validators/task";
import isValid from "../middlewares/is-valid";

const taskRouter = Router();

taskRouter.post(
  "/",
  isAuth,
  createTaskValidator,
  isValid,
  taskController.createTask
);

taskRouter.get("/", isAuth, taskController.getTasks);

taskRouter.put(
  "/:taskId",
  isAuth,
  updateTaskValidator,
  isValid,
  taskController.updateTask
);

export default taskRouter;
