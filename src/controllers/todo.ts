import { RequestHandler } from "express";
import todoModel from "../models/todo";

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const todos = await todoModel.find();

    return res.status(200).json({
      message: "Fetch todos success",
      todos: todos
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const newTodo = await todoModel.create({
      title: req.body.title,
      isCompleted: false
    });

    return res.status(200).json({
      message: "Create todo success",
      todo: newTodo
    });
  } catch (error) {
    next(error);
  }
};
