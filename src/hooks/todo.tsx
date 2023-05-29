import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo";

export const useGetTodosQuery = () => {
  return useQuery("todos", getTodos);
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};
