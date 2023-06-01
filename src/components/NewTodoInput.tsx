import { FormEventHandler, useCallback, useState } from "react";
import { useCreateTodoMutation } from "../hooks/todo";

interface Props {
  className?: string;
}

const NewTodoInput: React.FC<Props> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const createTodo = useCreateTodoMutation();

  const formSubmitHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      const title = enteredTitle.trim();

      if (title.length < 1) {
        setEnteredTitle("");
        return;
      }

      createTodo.mutate({ payload: { title: title } });

      setEnteredTitle("");
    },
    [enteredTitle, createTodo]
  );

  return (
    <form onSubmit={formSubmitHandler} className={props.className}>
      <input
        type="text"
        placeholder="Enter new todo"
        className="text-xl w-full border-b-2 outline-none text-center"
        value={enteredTitle}
        onChange={(e) => setEnteredTitle(e.target.value)}
      />
    </form>
  );
};

export default NewTodoInput;
