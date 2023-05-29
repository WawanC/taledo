import Todo from "../interfaces/Todo";

interface Props {
  todo: Todo;
  toggleTodo: () => void;
}

const TodoItem: React.FC<Props> = (props) => {
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
        onChange={props.toggleTodo}
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
