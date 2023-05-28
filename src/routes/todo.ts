import { Router } from "express";
import * as todoController from "../controllers/todo";

const todoRouter = Router();

todoRouter.get("/todos", todoController.getTodos);
todoRouter.post("/todo", todoController.createTodo);
todoRouter.put("/todo/:id", todoController.updateTodo);
todoRouter.delete("/todo/:id", todoController.deleteTodo);

export default todoRouter;
