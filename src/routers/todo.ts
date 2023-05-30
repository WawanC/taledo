import { Router } from "express";
import * as todoController from "../controllers/todo";
import {
  createSubTodoValidator,
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator
} from "../validators/todo";
import isValid from "../middlewares/is-valid";

const todoRouter = Router();

todoRouter.get("/", todoController.getTodos);

todoRouter.post("/", createTodoValidator, isValid, todoController.createTodo);
todoRouter.post(
  "/:todoId",
  createSubTodoValidator,
  isValid,
  todoController.createSubTodo
);

todoRouter.put(
  "/:todoId",
  updateTodoValidator,
  isValid,
  todoController.updateTodo
);

todoRouter.delete(
  "/:todoId",
  deleteTodoValidator,
  isValid,
  todoController.deleteTodo
);

export default todoRouter;
