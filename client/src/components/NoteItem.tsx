import { MouseEventHandler, useCallback, useMemo } from "react";
import TrashIcon from "../icons/TrashIcon";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation } from "../hooks/note";

type Props = {
  id: string;
  title: string;
  content: string;
};

const NoteItem: React.FC<Props> = (props) => {
  const deleteNote = useDeleteNoteMutation(props.id);
  const navigate = useNavigate();
  const noteInfo = useMemo(() => {
    const temporaryElement = document.createElement("div");
    temporaryElement.innerHTML = props.content;

    const firstChild = temporaryElement.firstChild;
    let remainingText = "";

    if (firstChild) {
      const textContentArray = [];

      let currentNode = firstChild.nextSibling;
      while (currentNode) {
        if (currentNode.textContent) {
          textContentArray.push(currentNode.textContent.trim());
        }
        currentNode = currentNode.nextSibling;
      }

      remainingText = textContentArray.join(" ");
    }

    return {
      title: temporaryElement.firstChild?.textContent || "",
      content: remainingText
    };
  }, [props.content]);

  const deleteNoteHandler = useCallback<MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      deleteNote.mutate();
    },
    [deleteNote]
  );

  return (
    <article
      className="flex flex-col gap-4 bg-semi_light dark:bg-bold
       p-4 rounded w-full md:w-1/4 shadow hover:cursor-pointer"
      onClick={() => navigate(`/note/${props.id}`)}
    >
      <h1 className="font-bold text-xl">{noteInfo.title}</h1>
      <p className="flex-1 line-clamp-3 overflow-hidden">{noteInfo.content}</p>
      <div className="flex justify-end gap-4">
        {/* <span className="hover:cursor-pointer">
          <NoteIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span> */}
        <span className="hover:cursor-pointer" onClick={deleteNoteHandler}>
          <TrashIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span>
      </div>
    </article>
  );
};

export default NoteItem;
