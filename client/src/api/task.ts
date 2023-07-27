import axios from "axios";
import {
  CreateTaskPayload,
  GetTasksResponse,
  UpdateTaskPayload
} from "../types/task";

const taskApi = axios.create({
  baseURL: `/api/tasks`,
  withCredentials: true
});

export const createTaskApi = async (data: { payload: CreateTaskPayload }) => {
  await taskApi.post("/", data.payload);
};

export const getTasksApi = async () => {
  const response = await taskApi.get<GetTasksResponse>("/");
  return response.data.tasks;
};

export const updateTaskApi = async (data: {
  taskId: string;
  payload: UpdateTaskPayload;
}) => {
  console.log("new section:", data.payload.section);
  console.log("new rank:", data.payload.rank);
  await taskApi.put(`/${data.taskId}`, data.payload);
};
