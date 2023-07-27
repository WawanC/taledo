import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTaskApi, getTasksApi, updateTaskApi } from "../api/task";

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
      console.log("invalidating...");
      queryClient.invalidateQueries("tasks");
    }
  });
};
