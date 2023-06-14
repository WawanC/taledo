import { Router } from "express";
import * as todoController from "../controllers/todo";
import {
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator
} from "../validators/todo";
import isValid from "../middlewares/is-valid";
import isAuth from "../middlewares/is-auth";

const todoRouter = Router();

todoRouter.get("/", isAuth, todoController.getTodos);

todoRouter.post(
  "/",
  isAuth,
  createTodoValidator,
  isValid,
  todoController.createTodo
);

todoRouter.put(
  "/:todoId",
  isAuth,
  updateTodoValidator,
  isValid,
  todoController.updateTodo
);

todoRouter.delete(
  "/:todoId",
  isAuth,
  deleteTodoValidator,
  isValid,
  todoController.deleteTodo
);

export default todoRouter;
