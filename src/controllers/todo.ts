import { RequestHandler } from "express";
import todoModel from "../models/todo";

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const todos = await todoModel.find().populate("children");

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
      isCompleted: false,
      parent: null
    });

    return res.status(200).json({
      message: "Create todo success",
      todo: newTodo
    });
  } catch (error) {
    next(error);
  }
};

export const createSubTodo: RequestHandler = async (req, res, next) => {
  try {
    const parentTodo = await todoModel.findById(req.params.todoId);

    if (!parentTodo) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Todo not found"
      });
    }

    if (parentTodo.parent) {
      return res.status(409).json({
        type: "CONFLICT",
        message: "Parent todo cannot be a subtodo"
      });
    }

    const newSubTodo = await todoModel.create({
      title: req.body.title,
      isCompleted: false,
      parent: parentTodo._id
    });

    parentTodo.children.push();
    await parentTodo.save();

    return res.status(500).json({
      message: "Create subtodo success",
      subTodo: newSubTodo
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const todo = await todoModel.findById(req.params.todoId);

    if (!todo) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Todo not found"
      });
    }
    await todo.updateOne({
      $set: { title: req.body.title, isCompleted: req.body.isCompleted }
    });

    const updatedTodo = await todoModel.findById(req.params.todoId);

    return res.status(200).json({
      message: "Update todo success",
      todo: updatedTodo
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const todo = await todoModel.findById(req.params.todoId);

    if (!todo) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Todo not found"
      });
    }

    if (todo.children.length > 0) {
      await todoModel.deleteMany({ _id: { $in: todo.children } });
    }

    await todo.deleteOne();

    return res.status(200).json({
      message: "Delete todo success",
      todo: todo
    });
  } catch (error) {
    next(error);
  }
};
