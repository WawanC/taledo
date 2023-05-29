import axios from "axios";
import {
  Todo,
  GetTodosResponse,
  UpdateTodoPayload,
  CreateTodoPayload
} from "../types/todo";

const todoApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/todos`
});

export const getTodos = async () => {
  const response = await todoApi.get<GetTodosResponse>("/");

  const todos: Todo[] = response.data.todos.map((todo) => ({
    id: todo._id,
    title: todo.title,
    isCompleted: todo.isCompleted
  }));

  return todos;
};

export const updateTodo = async (data: {
  todoId: string;
  payload: UpdateTodoPayload;
}) => {
  await todoApi.put(`/${data.todoId}`, data.payload);
};

export const createTodo = async (data: { payload: CreateTodoPayload }) => {
  await todoApi.post("/", data.payload);
};

export const deleteTodo = async (data: { todoId: string }) => {
  await todoApi.delete(`/${data.todoId}`);
};
