import { FormEventHandler, useCallback, useRef, useState } from "react";
import { useCreateTodoMutation } from "../hooks/todo";
import { motion } from "framer-motion";

interface Props {
  className?: string;
}

const NewTodoInput: React.FC<Props> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const createTodo = useCreateTodoMutation();
  const titleInputRef = useRef<HTMLInputElement>(null);

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
      titleInputRef.current?.blur();
    },
    [enteredTitle, createTodo]
  );

  return (
    <motion.form
      onSubmit={formSubmitHandler}
      className={props.className}
      initial={{ y: "-50%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <input
        ref={titleInputRef}
        type="text"
        placeholder="Enter New Todo"
        className="text-xl bg-transparent w-full border-b 
        outline-none text-center py-1"
        value={enteredTitle}
        onChange={(e) => setEnteredTitle(e.target.value)}
      />
    </motion.form>
  );
};

export default NewTodoInput;
