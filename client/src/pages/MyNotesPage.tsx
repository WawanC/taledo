import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { useGetNotesQuery } from "../hooks/note";

const MyNotesPage = () => {
  const getNotes = useGetNotesQuery();

  return (
    <main
      className="min-h-screen bg-light dark:bg-semi_bold
    flex flex-col items-center gap-8 p-4"
    >
      <Link
        to={"/new-note"}
        className="bg-semi_light dark:bg-bold 
        py-2 px-4 text-xl font-bold rounded shadow"
      >
        Create Note
      </Link>
      {getNotes.data && (
        <ul className="w-3/4 flex flex-wrap justify-center gap-4 ">
          {getNotes.data.map((note) => (
            <NoteItem key={note.id} title="Test Note" content={note.content} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default MyNotesPage;
