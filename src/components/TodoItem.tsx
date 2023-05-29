import { useUpdateTodoMutation } from "../hooks/todo";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();

  const toggleTodo = () => {
    updateTodo.mutate({
      todoId: props.todo.id,
      payload: {
        isCompleted: !props.todo.isCompleted
      }
    });
  };

  return (
    <li
      className="bg-gray-200 p-2 text-xl 
        flex gap-4 items-center"
    >
      <input
        type="checkbox"
        id={props.todo.id}
        className="w-6 h-6 hover:cursor-pointer"
        checked={props.todo.isCompleted}
        onChange={toggleTodo}
      />
      <label
        htmlFor={props.todo.id}
        className={`flex-1 ${
          props.todo.isCompleted && "line-through"
        } hover:cursor-pointer`}
      >
        {props.todo.title}
      </label>
    </li>
  );
};

export default TodoItem;
