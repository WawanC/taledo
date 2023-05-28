import { Router } from "express";
import * as todoController from "../controllers/todo";

const todoRouter = Router();

todoRouter.get("/todos", todoController.getTodos);
todoRouter.post("/todo", todoController.createTodo);

export default todoRouter;
