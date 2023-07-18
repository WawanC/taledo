import { useNavigate, useParams } from "react-router-dom";
import { useGetNoteQuery, useUpdateNoteMutation } from "../hooks/note";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

const NoteDetailPage = () => {
  const params = useParams();
  const getNote = useGetNoteQuery(params.noteId || "");
  const [notes, setNotes] = useState("");
  const updateNote = useUpdateNoteMutation(params.noteId || "");
  const navigate = useNavigate();

  const formSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (notes.trim().length < 1 || !params.noteId) {
      return;
    }

    updateNote.mutate({
      content: notes.trim()
    });

    setNotes("");
    navigate("/my-notes");
  };

  useEffect(() => {
    if (getNote.data) setNotes(getNote.data.content);
  }, [getNote.data]);

  return (
    <main
      className="min-h-screen bg-light dark:bg-semi_bold
    flex flex-col items-center gap-8 p-4"
    >
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col items-center min-h-screen 
        bg-light dark:bg-semi_bold py-4 px-2 w-full"
      >
        <ReactQuill
          theme="snow"
          className="flex-1 flex flex-col w-full py-4 gap-8 rounded"
          value={notes}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
              ]
            ]
          }}
          children={
            <div
              className="md:w-1/2 md:mx-auto bg-semi_light dark:bg-bold 
              flex-1 h-full !border-none p-2 md:p-4
              text-xl md:text-2xl text-bold dark:text-light font-poppins rounded
              shadow [&>*]:leading-loose"
            />
          }
          onChange={(val) => setNotes(val)}
          placeholder="Enter note here..."
        />
        <button className="bg-semi_light dark:bg-bold py-2 px-4 rounded-md shadow text-xl">
          Submit
        </button>
      </form>
    </main>
  );
};

export default NoteDetailPage;
