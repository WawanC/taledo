import { Router } from "express";
import * as todoController from "../controllers/todo";
import {
  createTodoValidator,
  deleteTodoValidator,
  updateTodoValidator
} from "../validators/todo";
import isValid from "../middlewares/is-valid";

const todoRouter = Router();

todoRouter.get("/", todoController.getTodos);
todoRouter.post("/", createTodoValidator, isValid, todoController.createTodo);
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
