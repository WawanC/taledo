import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTaskApi, getTasksApi } from "../api/task";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createTaskApi, {
    onSettled: () => queryClient.invalidateQueries("tasks")
  });
};

export const useGetTasksQuery = () => {
  return useQuery("tasks", getTasksApi);
};
