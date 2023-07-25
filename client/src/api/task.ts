import axios from "axios";
import { CreateTaskPayload } from "../types/task";

const taskApi = axios.create({
  baseURL: `/api/tasks`,
  withCredentials: true
});

export const createTaskApi = async (data: { payload: CreateTaskPayload }) => {
  await taskApi.post("/", data.payload);
};
