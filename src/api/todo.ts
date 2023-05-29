import axios from "axios";
import { Todo, getTodosResponse } from "../types/todo";

const todoApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/todos`
});

export const getTodos = async () => {
  const response = await todoApi.get<getTodosResponse>("/");

  const todos: Todo[] = response.data.todos.map((todo) => ({
    id: todo._id,
    title: todo.title,
    isCompleted: todo.isCompleted
  }));

  return todos;
};
