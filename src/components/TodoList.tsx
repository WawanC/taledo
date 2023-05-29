import TodoItem from "./TodoItem";
import { useGetTodosQuery } from "../hooks/todo.tsx";

const TodoList: React.FC = () => {
  const getTodos = useGetTodosQuery();

  return getTodos.isLoading ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {getTodos.data &&
        getTodos.data.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default TodoList;
