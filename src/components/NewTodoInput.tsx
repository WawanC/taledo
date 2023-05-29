import { FormEventHandler, useState } from "react";
import { useCreateTodoMutation } from "../hooks/todo";

const NewTodoInput: React.FC = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const createTodo = useCreateTodoMutation();

  const formSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const title = enteredTitle.trim();

    if (title.length < 1) {
      setEnteredTitle("");
      return;
    }

    createTodo.mutate({ title: title });

    setEnteredTitle("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
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
