import { useCallback, useMemo, useState } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";
import { Todo } from "../types/todo";
import AddIcon from "../icons/AddIcon";
import DownIcon from "../icons/DownIcon";
import BarsIcon from "../icons/BarsIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NewSubTodoInput from "./NewSubTodoInput";

interface Props {
  todo: Todo;
  subtodo?: boolean;
}

const TodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();
  const deleteTodo = useDeleteTodoMutation();
  const [isAddNew, setIsAddNew] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
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
      className={`bg-primary p-2 text-xl border
      flex flex-col gap-4 ${props.subtodo && "ml-8 p-0"}`}
      style={sortableStyles}
    >
      <div className="flex gap-4 items-center">
        <span
          className="hover:cursor-grab"
          onClick={toggleTodo}
          {...listeners}
          {...attributes}
        >
          <BarsIcon className="w-6 h-6" />
        </span>
        <label
          className={`flex-1 ${
            props.todo.isCompleted && "line-through"
          } hover:cursor-pointer`}
          onClick={toggleTodo}
        >
          {props.todo.title}{" "}
          {!props.subtodo &&
            props.todo.subTodos.length > 0 &&
            `(${props.todo.subTodos.length})`}
        </label>

        {!props.subtodo && !isAddNew && (
          <span
            className="hover:cursor-pointer"
            onClick={() => {
              setIsExpand(true);
              setIsAddNew(true);
            }}
          >
            <AddIcon className="w-8 h-8" />
          </span>
        )}
        <span
          className="hover:cursor-pointer"
          onClick={() => deleteTodo.mutate({ todoId: props.todo.id })}
        >
          <DeleteIcon className="w-8 h-8" />
        </span>
        {!props.subtodo && props.todo.subTodos.length > 0 && (
          <span
            className="hover:cursor-pointer"
            onClick={() => setIsExpand((v) => !v)}
          >
            <DownIcon className={`w-8 h-8 ${isExpand && "rotate-180"}`} />
          </span>
        )}
      </div>
      {isExpand && (
        <div className="flex flex-col">
          {!props.subtodo &&
            props.todo.subTodos.map((subTodo) => (
              <TodoItem key={subTodo.id} todo={subTodo} subtodo={true} />
            ))}
          {isAddNew && (
            <NewSubTodoInput
              parentId={props.todo.id}
              cancel={() => {
                setIsExpand(false);
                setIsAddNew(false);
              }}
            />
          )}
        </div>
      )}
    </li>
  );
};

export default TodoItem;
