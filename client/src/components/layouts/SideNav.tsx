import { motion } from "framer-motion";
import { useGetMeUserQuery, useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import { useMemo } from "react";
import DarkModeToggle from "../DarkModeToggle";
import AppLogo from "../AppLogo";
import { Link } from "react-router-dom";
import AccountIcon from "../../icons/AccountIcon";
import NoteIcon from "../../icons/NoteIcon";

interface Props {
  onClose: () => void;
}

const SideNav: React.FC<Props> = (props) => {
  const getMeUser = useGetMeUserQuery({ enabled: false });
  const logoutUser = useLogoutUserMutation();

  const todayDate = useMemo(
    () =>
      new Date().toLocaleDateString("us", {
        dateStyle: "long"
      }),
    []
  );

  return (
    <nav className="fixed inset-0 z-10">
      <div
        className="bg-black opacity-50 w-full h-full"
        onClick={props.onClose}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[60%] bg-light dark:bg-bold
      flex flex-col items-center py-16 gap-12"
        initial={{ x: "-100%" }}
        animate={{ x: "0" }}
        exit={{ x: "-100%" }}
        transition={{ bounce: false, duration: 0.25 }}
      >
        <div className="flex flex-col gap-4 items-center">
          <AppLogo className="w-28 h-28" />
          <h1 className="text-2xl font-bold">
            {getMeUser.data?.user.username || "Username"}
          </h1>
        </div>
        <h2 className="text-xl">{todayDate}</h2>
        <ul className="flex flex-col items-center gap-4">
          <Link
            to={"/notes"}
            className="flex text-xl gap-2 items-center"
            onClick={() => props.onClose()}
          >
            <NoteIcon className="w-8 h-8" />
            <span>My Notes</span>
          </Link>
          <Link
            to={"/account"}
            className="flex text-xl gap-2 items-center"
            onClick={() => props.onClose()}
          >
            <AccountIcon className="w-8 h-8" />
            <span>Account</span>
          </Link>
          <button
            className="flex text-xl gap-2 items-center"
            onClick={() => logoutUser.mutate()}
          >
            <LogoutIcon className="w-8 h-8" />
            <span>Logout</span>
          </button>
        </ul>
        <DarkModeToggle />
      </motion.div>
    </nav>
  );
};

export default SideNav;
