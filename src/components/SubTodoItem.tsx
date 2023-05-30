import DeleteIcon from "../icons/DeleteIcon";

const SubTodoItem: React.FC = () => {
  return (
    <article
      className="flex items-center gap-4 p-2 text-xl
                 bg-gray-100 ml-8 border"
    >
      <input type="checkbox" className="w-6 h-6 hover:cursor-pointer" />
      <label className={`flex-1 hover:cursor-pointer`}>SubTodo</label>
      <span className="hover:cursor-pointer">
        <DeleteIcon className="w-8 h-8 " />
      </span>
    </article>
  );
};

export default SubTodoItem;
