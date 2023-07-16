import { useParams } from "react-router-dom";
import { useGetNoteQuery } from "../hooks/note";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
          className="text-2xl bg-semi_light dark:bg-bold py-4 md:px-8 md:py-8 rounded shadow 
          w-full md:w-3/4 min-h-full leading-10"
        >
          <ReactQuill
            theme="snow"
            value={getNote.data.content}
            readOnly
            modules={{
              toolbar: false
            }}
            children={
              <div
                className="w-full md:mx-auto bg-semi_light dark:bg-bold
                flex-1 h-full !border-none p-2 md:p-4
                text-xl md:text-2xl text-bold dark:text-light font-poppins rounded
                [&>*]:leading-loose"
              />
            }
          />
        </div>
      )}
    </main>
  );
};

export default NoteDetailPage;
