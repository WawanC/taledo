import TodoItem from "./TodoItem";
import { useGetTodos } from "../hooks/todo.tsx";

const TodoList: React.FC = () => {
  const getTodos = useGetTodos();

  const toggleTodo = (todoId: string) => {
    // const updatedTodos = [...todos];
    // const todoIdx = updatedTodos.findIndex((todo) => todo.id === todoId);
    // if (todoIdx < 0) return;
    // updatedTodos[todoIdx].isCompleted = !updatedTodos[todoIdx].isCompleted;
    // setTodos(updatedTodos);
  };

  return getTodos.isFetching ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <ul className="flex flex-col gap-4">
      {getTodos.data &&
        getTodos.data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={() => toggleTodo(todo.id)}
          />
        ))}
    </ul>
  );
};

export default TodoList;
