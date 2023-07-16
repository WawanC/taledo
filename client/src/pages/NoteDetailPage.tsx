import { useParams } from "react-router-dom";
import { useGetNoteQuery } from "../hooks/note";

const NoteDetailPage = () => {
  const params = useParams();
  const getNote = useGetNoteQuery(params.noteId || "");

  return (
    <main
      className="min-h-screen h-1 bg-light dark:bg-semi_bold
    flex flex-col items-center gap-8 p-4"
    >
      {getNote.data && (
        <div
          className="text-2xl bg-semi_light dark:bg-bold p-8 rounded shadow 
          w-full md:w-3/4 min-h-full leading-10"
          dangerouslySetInnerHTML={{ __html: getNote.data.content }}
        ></div>
      )}
    </main>
  );
};

export default NoteDetailPage;
