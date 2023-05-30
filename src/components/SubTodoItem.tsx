import { useCallback } from "react";
import { useUpdateTodoMutation, useDeleteTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
}

const SubTodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();
  const deleteTodo = useDeleteTodoMutation();

  const toggleTodo = useCallback(() => {
    updateTodo.mutate({
      todoId: props.todo.id,
      payload: {
        isCompleted: !props.todo.isCompleted
      }
    });
  }, [props.todo.id, props.todo.isCompleted, updateTodo]);

  return (
    <article
      className="flex items-center gap-4 p-2 text-xl
                 bg-gray-100 ml-8 border"
    >
      <input
        type="checkbox"
        className="w-6 h-6 hover:cursor-pointer"
        id={props.todo.id}
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
      <span
        className="hover:cursor-pointer"
        onClick={() => deleteTodo.mutate({ todoId: props.todo.id })}
      >
        <DeleteIcon className="w-8 h-8" />
      </span>
    </article>
  );
};

export default SubTodoItem;
