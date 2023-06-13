import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createSubTodoApi,
  createTodoApi,
  deleteTodoApi,
  getTodosApi,
  updateTodoApi
} from "../api/todo";
import { Todo } from "../types/todo";
import { generateLexorank } from "../utils/lexorank";

export const useGetTodosQuery = () => {
  return useQuery("todos", getTodosApi);
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodoApi, {
    onSettled: () => {
      queryClient.invalidateQueries("todos");
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      queryClient.setQueryData<Todo[]>(["todos"], (prev) => {
        if (!variables.payload.order) return [];
        if (!prev) return [];
        const todos = [...prev];

        const todoIdx = todos.findIndex((todo) => todo.id === variables.todoId);

        if (todoIdx < 0) return prev;

        const newRank = generateLexorank(
          prev,
          todos[todoIdx].rank,
          variables.payload.order
        );

        if (!newRank) return prev;

        todos[todoIdx].rank = newRank.toString();

        const sortedTodos = todos.sort((a, b) => {
          if (a.rank > b.rank) return 1;
          if (a.rank < b.rank) return -1;
          return 0;
        });

        return sortedTodos;
      });
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

export const useCreateSubTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createSubTodoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
};
