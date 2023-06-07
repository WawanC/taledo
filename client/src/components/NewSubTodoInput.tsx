import { FormEventHandler, useCallback, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import { useCreateSubTodoMutation } from "../hooks/todo";

interface Props {
  parentId: string;
  cancel: () => void;
}

const NewSubTodoInput: React.FC<Props> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const createSubTodo = useCreateSubTodoMutation();

  const formSubmitHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      const title = enteredTitle.trim();
      if (title.length > 0) {
        createSubTodo.mutate({
          parentTodoId: props.parentId,
          payload: {
            title: title
          }
        });
      }
      setEnteredTitle("");
      props.cancel();
    },
    [createSubTodo, enteredTitle, props]
  );

  return (
    <>
      <div className="absolute inset-0 bg-transparent" onClick={props.cancel} />
      <form
        className="flex items-center gap-4 p-2 text-xl
             bg-primary ml-8 border z-10"
        onSubmit={formSubmitHandler}
      >
        <input
          type="text"
          className="flex-1 bg-primary outline-none border-b-2"
          placeholder="Enter new subtodo"
          autoFocus={true}
          value={enteredTitle}
          onChange={(e) => setEnteredTitle(e.target.value)}
        />
        <span className="hover:cursor-pointer" onClick={props.cancel}>
          <DeleteIcon className="w-8 h-8" />
        </span>
      </form>
    </>
  );
};

export default NewSubTodoInput;
