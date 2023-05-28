import { RequestHandler } from "express";
import todoModel from "../models/todo";

export const getTodos: RequestHandler = async (req, res) => {
  const todos = await todoModel.find();

  return res.status(200).json({
    message: "Fetch todos success",
    todos: todos
  });
};

export const createTodo: RequestHandler = async (req, res) => {
  const newTodo = await todoModel.create({
    title: req.body.title,
    isCompleted: false
  });

  return res.status(200).json({
    message: "Create todo success",
    todo: newTodo
  });
};
