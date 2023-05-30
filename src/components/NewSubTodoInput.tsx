import DeleteIcon from "../icons/DeleteIcon";

interface Props {
  cancel: () => void;
}

const NewSubTodoInput: React.FC<Props> = (props) => {
  return (
    <>
      <div className="absolute inset-0 bg-transparent" onClick={props.cancel} />
      <form
        className={`flex items-center gap-4 p-2 text-xl
             bg-gray-100 ml-8 border z-10`}
      >
        {/* <input type="checkbox" className="w-6 h-6 hover:cursor-pointer" /> */}
        <input
          type="text"
          className="flex-1 bg-transparent outline-none border-b-2"
          placeholder="Enter new subtodo"
          autoFocus={true}
        />
        <span className="hover:cursor-pointer" onClick={props.cancel}>
          <DeleteIcon className="w-8 h-8" />
        </span>
      </form>
    </>
  );
};

export default NewSubTodoInput;
