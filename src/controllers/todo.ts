import { RequestHandler } from "express";
import todoModel from "../models/todo";

export const getTodos: RequestHandler = async (req, res) => {
  const todos = await todoModel.find();

  return res.status(200).json({
    todos: todos
  });
};
