import { useMemo } from "react";
import NoteIcon from "../icons/NoteIcon";
import TrashIcon from "../icons/TrashIcon";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  content: string;
};

const NoteItem: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const noteInfo = useMemo(() => {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = props.content;
    return {
      title: temporaryElement.firstChild?.textContent || "",
      content: temporaryElement.textContent || temporaryElement.innerText || ""
    };
  }, [props.content]);

  return (
    <article
      className="flex flex-col gap-4 bg-semi_light dark:bg-bold
       p-4 rounded w-full md:w-1/4 shadow hover:cursor-pointer"
      onClick={() => navigate(`/note/${props.id}`)}
    >
      <h1 className="font-bold text-xl">{noteInfo.title}</h1>
      <p>{noteInfo.content}</p>
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
