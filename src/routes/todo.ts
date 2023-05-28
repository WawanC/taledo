import { Router } from "express";
import * as todoController from "../controllers/todo";

const todoRouter = Router();

todoRouter.get("/todos", todoController.getTodos);

export default todoRouter;
