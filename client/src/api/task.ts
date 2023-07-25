import axios from "axios";
import { CreateTaskPayload, GetTasksResponse } from "../types/task";

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
