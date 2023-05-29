import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos, updateTodo } from "../api/todo";

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
