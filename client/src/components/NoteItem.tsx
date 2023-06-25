import NoteIcon from "../icons/NoteIcon";
import TrashIcon from "../icons/TrashIcon";

const NoteItem: React.FC = () => {
  return (
    <article
      className="flex flex-col gap-4 bg-semi_light dark:bg-bold
       p-4 rounded w-full md:w-1/4 shadow"
    >
      <h1 className="font-bold text-xl">Learn React</h1>
      <p>
        This is tutorial about how to learn react and it's ability to rendering
        single page application with ease.
      </p>
      <div className="flex justify-end gap-4">
        <span className="hover:cursor-pointer">
          <NoteIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span>
        <span className="hover:cursor-pointer">
          <TrashIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span>
      </div>
    </article>
  );
};

export default NoteItem;
