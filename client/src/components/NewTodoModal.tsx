import { useCallback } from "react";
import CalendarIcon from "../icons/CalendarIcon";

interface Props {
  onClose: () => void;
}

const NewTodoModal: React.FC<Props> = (props) => {
  const closeModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      props.onClose();
    },
    [props]
  );

  return (
    <section className="absolute flex justify-center items-center inset-0 text-xl">
      <div
        className="absolute bg-black opacity-50 inset-0"
        onClick={closeModal}
      ></div>
      <article
        className="w-1/2 z-10 bg-bold shadow-lg rounded
      flex flex-col gap-16 py-8 px-20 items-center"
      >
        <h1 className="font-bold text-4xl text-center">Create New Todo</h1>
        <form className="w-full flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <label htmlFor="title" className="font-bold">
              Title :
            </label>
            <input
              type="text"
              id="title"
              className="w-3/4 bg-transparent p-2 border-b"
              placeholder="Enter title here"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="title" className="font-bold">
              Deadline :
            </label>
            <button
              className="bg-semi_bold py-2 px-4 shadow rounded
            flex items-center gap-2"
            >
              <span>Select DateTime</span>
              <span>
                <CalendarIcon className="w-8 h-8" />
              </span>
            </button>
          </div>
          <button className="self-center bg-semi_bold rounded shadow p-2 font-bold">
            Create
          </button>
        </form>
      </article>
    </section>
  );
};

export default NewTodoModal;
