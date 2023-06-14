import { FormEventHandler, useCallback, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import DatePicker from "react-flatpickr";
import { useCreateTodoMutation } from "../hooks/todo";

interface Props {
  onClose: () => void;
}

const NewTodoModal: React.FC<Props> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDeadline, setEnteredDeadline] = useState<string>(
    new Date().toISOString()
  );
  const datePickerRef = useRef<DatePicker>(null);
  const createTodo = useCreateTodoMutation();

  const closeModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      props.onClose();
    },
    [props]
  );

  const submitFormHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      console.log(enteredTitle);
      console.log(enteredDeadline);

      createTodo.mutate({
        payload: { title: enteredTitle.trim(), deadline: enteredDeadline }
      });

      setEnteredTitle("");
      setEnteredDeadline(new Date().toISOString());

      props.onClose();
    },
    [enteredTitle, enteredDeadline, props, createTodo]
  );

  return (
    <section
      className="absolute flex justify-center items-end md:items-center 
      inset-0 text-lg md:text-xl"
    >
      <div
        className="absolute bg-black opacity-50 inset-0"
        onClick={closeModal}
      ></div>
      <article
        className="w-full md:w-1/2 z-10 bg-bold shadow-lg rounded
      flex flex-col gap-16 py-8 px-8 md:px-20 items-center"
      >
        <h1 className="font-bold text-4xl text-center">Create New Todo</h1>
        <form
          className="w-full flex flex-col gap-8"
          onSubmit={submitFormHandler}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <label htmlFor="title" className="font-bold">
              Title :
            </label>
            <input
              type="text"
              id="title"
              className="w-full md:w-3/5 bg-transparent p-2 border-b"
              placeholder="Enter title here"
              value={enteredTitle}
              onChange={(e) => setEnteredTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="title" className="font-bold">
              Deadline :
            </label>

            <Flatpickr
              data-enable-time
              ref={datePickerRef}
              className="bg-semi_bold text-center p-2 rounded"
              options={{
                dateFormat: "d M Y",
                disableMobile: true,
                position: "above"
              }}
              value={new Date(enteredDeadline)}
              onChange={(dates) => {
                setEnteredDeadline(dates[0].toISOString());
              }}
              size={12}
            />
          </div>
          <button
            type="submit"
            className="self-center bg-semi_bold rounded shadow px-4 py-2 font-bold"
          >
            Create
          </button>
        </form>
      </article>
    </section>
  );
};

export default NewTodoModal;
