import { RequestHandler } from "express";
import { Todo } from "../interfaces/todo";

const todosData: Todo[] = [
  { id: "1", title: "Learn React JS", isCompleted: false },
  { id: "2", title: "Learn Node JS", isCompleted: false },
  { id: "3", title: "Learn Express JS", isCompleted: false }
];

export const getTodos: RequestHandler = (req, res) => {
  return res.status(200).json({
    todos: todosData
  });
};
