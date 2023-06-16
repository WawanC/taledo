import { useMemo, useState } from "react";
import { useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import useAuthStore from "../../stores/auth";
import { Link } from "react-router-dom";
import BarsIcon from "../../icons/BarsIcon";
import SideNav from "./SideNav";
import { AnimatePresence } from "framer-motion";
import DarkModeToggle from "../DarkModeToggle";
import AppLogo from "../AppLogo";
import AccountIcon from "../../icons/AccountIcon";

const NavBar: React.FC = () => {
  const logoutUser = useLogoutUserMutation();
  const isAuth = useAuthStore().isAuth;
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const todayDate = useMemo(
    () =>
      new Date().toLocaleDateString("us", {
        dateStyle: "full"
      }),
    []
  );

  return (
    <>
      <AnimatePresence>
        {isSideNavOpen && <SideNav onClose={() => setIsSideNavOpen(false)} />}
      </AnimatePresence>
      <nav
        className="bg-semi_light dark:bg-bold p-2 w-full
        flex justify-center md:justify-between items-center 
        px-8 relative"
      >
        <div
          className="absolute left-4 top-0 bottom-0 
        flex items-center hover:cursor-pointer md:hidden"
          onClick={() => setIsSideNavOpen(true)}
        >
          <BarsIcon className="w-8 h-8" />
        </div>
        <Link
          to={"/dashboard"}
          className="text-2xl font-bold text-center flex gap-2 md:w-1/6"
        >
          <AppLogo className="w-8 h-8 hidden md:flex" />
          <span>Taledo</span>
        </Link>
        <span className="hidden md:block text-xl text-center md:w-1/4">
          {todayDate}
        </span>
        {isAuth && (
          <ul className="hidden md:flex gap-4 md:w-1/6 md:justify-end md:items-center">
            <Link to={"/account"}>
              <AccountIcon className="w-8 h-8" />
            </Link>
            <DarkModeToggle />
            <button className=" text-xl" onClick={() => logoutUser.mutate()}>
              <LogoutIcon className="w-8 h-8" />
            </button>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
