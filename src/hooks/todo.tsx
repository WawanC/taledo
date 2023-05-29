import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTodoApi,
  deleteTodoApi,
  getTodosApi,
  updateTodoApi
} from "../api/todo";

export const useGetTodosQuery = () => {
  return useQuery("todos", getTodosApi);
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};
