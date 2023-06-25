import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";

const MyNotesPage = () => {
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
      <ul className="w-3/4 flex flex-wrap justify-center gap-4 ">
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </ul>
    </main>
  );
};

export default MyNotesPage;
