import { Router } from "express";
import * as todoController from "../controllers/todo";
import {
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator
} from "../validators/todo";
import isValid from "../middlewares/is-valid";

const todoRouter = Router();

todoRouter.get("/todos", todoController.getTodos);
todoRouter.post(
  "/todo",
  createTodoValidator,
  isValid,
  todoController.createTodo
);
todoRouter.put(
  "/todo/:todoId",
  updateTodoValidator,
  isValid,
  todoController.updateTodo
);
todoRouter.delete(
  "/todo/:todoId",
  deleteTodoValidator,
  isValid,
  todoController.deleteTodo
);

export default todoRouter;
