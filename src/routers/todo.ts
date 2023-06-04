import { Router } from "express";
import * as todoController from "../controllers/todo";
import {
  createSubTodoValidator,
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator
} from "../validators/todo";
import isValid from "../middlewares/is-valid";
import isAuth from "../middlewares/is-auth";

const todoRouter = Router();

todoRouter.get("/", todoController.getTodos);

todoRouter.post(
  "/",
  isAuth,
  createTodoValidator,
  isValid,
  todoController.createTodo
);
todoRouter.post(
  "/:todoId",
  isAuth,
  createSubTodoValidator,
  isValid,
  todoController.createSubTodo
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
