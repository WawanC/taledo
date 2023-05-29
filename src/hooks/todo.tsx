import { useQuery } from "react-query";
import { getTodos } from "../api/todo";

export const useGetTodos = () => {
  return useQuery("todos", getTodos);
};
