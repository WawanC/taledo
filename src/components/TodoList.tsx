import TodoItem from "./TodoItem";
import { useGetTodosQuery } from "../hooks/todo.tsx";

interface Props {
  className?: string;
}

const TodoList: React.FC<Props> = (props) => {
  const getTodos = useGetTodosQuery();

  return getTodos.isLoading ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <ul className={`flex flex-col gap-4 ${props.className}`}>
      {getTodos.data &&
        getTodos.data.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default TodoList;
