import { FormEventHandler, useCallback, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import DatePicker from "react-flatpickr";
import { useCreateTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";

interface Props {
  onClose: () => void;
}

const NewTodoModal: React.FC<Props> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDeadline, setEnteredDeadline] = useState<string | undefined>();
  const datePickerRef = useRef<DatePicker>(null);
  const createTodo = useCreateTodoMutation();
  const [error, setError] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const closeModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isDatePickerOpen) {
        datePickerRef.current?.flatpickr.close();
        return setIsDatePickerOpen(false);
      }
      props.onClose();
    },
    [props, isDatePickerOpen]
  );

  const submitFormHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setError(null);

      if (enteredTitle.trim().length <= 0) {
        setError("Valid todo title is required");
        setEnteredTitle("");
        return;
      }

      createTodo.mutate({
        payload: {
          title: enteredTitle.trim(),
          deadline: enteredDeadline
        }
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
      inset-0 text-lg md:text-xl z-10"
    >
      <div
        className="absolute bg-black opacity-50 inset-0"
        onClick={closeModal}
      ></div>
      <article
        className="w-full md:w-1/2 z-10 bg-bold shadow-lg rounded
      flex flex-col gap-12 py-8 px-8 md:px-20 items-center"
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bold text-4xl text-center">Create New Todo</h1>
          {error && (
            <span className="text-base text-red-500 text-center">
              Error Text
            </span>
          )}
        </div>
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
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              Deadline :
            </label>
            <div className="flex justify-center gap-2 h-10 md:px-16">
              <Flatpickr
                data-enable-time
                onOpen={() => {
                  setEnteredDeadline(new Date().toISOString());
                  setIsDatePickerOpen(true);
                }}
                ref={datePickerRef}
                className="bg-semi_bold text-center rounded py-2 flex-1"
                options={{
                  dateFormat: "H:i - d M Y",
                  disableMobile: true,
                  position: "above",
                  minDate: "today",
                  minTime: new Date(),
                  time_24hr: true,
                  defaultHour: new Date().getHours(),
                  defaultMinute: new Date().getMinutes()
                }}
                value={enteredDeadline}
                onChange={(dates) => {
                  setEnteredDeadline(dates[0].toISOString());
                }}
                placeholder="None"
              />
              <span
                className="bg-semi_bold shadow rounded h-full aspect-square
              flex justify-center items-center hover:cursor-pointer"
                onClick={() => setEnteredDeadline(undefined)}
              >
                <DeleteIcon className="w-10 h-10" />
              </span>
            </div>
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
