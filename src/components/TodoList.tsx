import { useState } from "react";
import Todo from "../interfaces/Todo";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React JS", isCompleted: false },
    { id: "2", title: "Learn Node JS", isCompleted: false },
    { id: "3", title: "Learn MongoDB", isCompleted: false }
  ]);

  const toggleTodo = (todoId: string) => {
    const updatedTodos = [...todos];
    const todoIdx = updatedTodos.findIndex((todo) => todo.id === todoId);
    if (todoIdx < 0) return;
    updatedTodos[todoIdx].isCompleted = !updatedTodos[todoIdx].isCompleted;
    setTodos(updatedTodos);
  };

  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
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
