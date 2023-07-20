import { Link } from "react-router-dom";
import AccountIcon from "../../icons/AccountIcon";
import NoteIcon from "../../icons/NoteIcon";
import AppLogo from "../AppLogo";

const SideMenu: React.FC = () => {
  return (
    <nav
      className="bg-semi_light dark:bg-bold 
      w-1/6 shadow md:flex hidden 
      flex-col gap-16 py-4 items-center"
    >
      <Link
        to={"/dashboard"}
        className="text-2xl font-bold text-center flex justify-center 
    gap-2 w-full items-center"
      >
        <AppLogo className="w-8 h-8" />
        <span>Taledo</span>
      </Link>
      <ul className="flex flex-col gap-8 w-full text-lg">
        <Link
          to={"/my-notes"}
          className="flex gap-2 items-center justify-center 
      p-4 hover:cursor-pointer hover:opacity-50"
        >
          <NoteIcon className="w-8 h-8" />
          <span>My Notes</span>
        </Link>
        <Link
          to={"/account"}
          className="flex gap-2 items-center justify-center 
      p-4 hover:cursor-pointer hover:opacity-50"
        >
          <AccountIcon className="w-8 h-8" />
          <span>My Account</span>
        </Link>
      </ul>
    </nav>
  );
};

export default SideMenu;
