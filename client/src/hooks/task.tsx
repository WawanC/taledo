import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTaskApi,
  deleteTaskApi,
  getTasksApi,
  updateTaskApi
} from "../api/task";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createTaskApi, {
    onSettled: () => queryClient.invalidateQueries("tasks")
  });
};

export const useGetTasksQuery = () => {
  return useQuery("tasks", getTasksApi);
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTaskApi, {
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    }
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTaskApi, {
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    }
  });
};
