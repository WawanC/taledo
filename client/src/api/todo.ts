import axios from "axios";
import {
  Todo,
  GetTodosResponse,
  UpdateTodoPayload,
  CreateTodoPayload
} from "../types/todo";

const todoApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/todos`,
  withCredentials: true
});

export const getTodosApi = async () => {
  const response = await todoApi.get<GetTodosResponse>("/");

  const todos: Todo[] = response.data.todos;

  return todos;
};

export const updateTodoApi = async (data: {
  todoId: string;
  payload: UpdateTodoPayload;
}) => {
  await todoApi.put(`/${data.todoId}`, data.payload);
};

export const createTodoApi = async (data: { payload: CreateTodoPayload }) => {
  await todoApi.post("/", data.payload);
};

export const deleteTodoApi = async (data: { todoId: string }) => {
  await todoApi.delete(`/${data.todoId}`);
};

export const createSubTodoApi = async (data: {
  parentTodoId: string;
  payload: CreateTodoPayload;
}) => {
  await todoApi.post(`/${data.parentTodoId}`, data.payload);
};
