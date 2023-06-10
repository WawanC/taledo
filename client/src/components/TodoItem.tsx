import { useCallback, useMemo } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";
import { Todo } from "../types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();
  const deleteTodo = useDeleteTodoMutation();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.todo.id
    });

  const sortableStyles = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition
    }),
    [transform, transition]
  );

  const toggleTodo = useCallback(() => {
    updateTodo.mutate({
      todoId: props.todo.id,
      payload: {
        isCompleted: !props.todo.isCompleted
      }
    });
  }, [props.todo.id, props.todo.isCompleted, updateTodo]);

  return (
    <li
      ref={setNodeRef}
      className={`bg-bold py-4 px-4 text-xl
      flex flex-col gap-4 rounded-xl shadow`}
      style={sortableStyles}
    >
      <div className="flex gap-4 items-center">
        <span
          className="hover:cursor-grab"
          onClick={toggleTodo}
          {...listeners}
          {...attributes}
        >
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-light"></div>
        </span>
        <label
          className={`flex-1 ${
            props.todo.isCompleted && "line-through"
          } hover:cursor-pointer`}
          onClick={toggleTodo}
        >
          {props.todo.title}
        </label>

        <span
          className="hover:cursor-pointer"
          onClick={() => deleteTodo.mutate({ todoId: props.todo.id })}
        >
          <DeleteIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
