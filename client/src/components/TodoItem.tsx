import { useCallback, useState } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";
import { Todo } from "../types/todo";
import AddIcon from "../icons/AddIcon";
import NewSubTodoInput from "./NewSubTodoInput";
import DownIcon from "../icons/DownIcon";
import BarsIcon from "../icons/BarsIcon";

interface Props {
  todo: Todo;
  subtodo?: boolean;
}

const TodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();
  const deleteTodo = useDeleteTodoMutation();
  const [isAddNew, setIsAddNew] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const toggleTodo = useCallback(() => {
    updateTodo.mutate({
      todoId: props.todo.id,
      payload: {
        isCompleted: !props.todo.isCompleted
      }
    });
  }, [props.todo.id, props.todo.isCompleted, updateTodo]);

  return (
    <>
      <li
        className={`bg-primary p-2 text-xl 
        flex gap-4 items-center border ${props.subtodo && "ml-8"}`}
      >
        {/* <input
          type="checkbox"
          id={props.todo.id}
          className="w-6 h-6 hover:cursor-pointer"
          checked={props.todo.isCompleted}
          onChange={() => {
            setIsExpand(true);
            toggleTodo();
          }}
        /> */}
        <span className="hover:cursor-grab" onClick={toggleTodo}>
          <BarsIcon className="w-6 h-6" />
        </span>
        <label
          htmlFor={props.todo.id}
          className={`flex-1 ${
            props.todo.isCompleted && "line-through"
          } hover:cursor-pointer`}
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
      </li>

      {!props.subtodo &&
        isExpand &&
        props.todo.subTodos.map((subTodo) => (
          <TodoItem key={subTodo.id} todo={subTodo} subtodo={true} />
        ))}
      {isAddNew && (
        <NewSubTodoInput
          parentId={props.todo.id}
          cancel={() => {
            setIsExpand(true);
            setIsAddNew(false);
          }}
        />
      )}
    </>
  );
};

export default TodoItem;
