import { useMemo, useState } from "react";
import { useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import useAuthStore from "../../stores/auth";
import { Link } from "react-router-dom";
import BarsIcon from "../../icons/BarsIcon";
import SideNav from "./SideNav";
import { AnimatePresence } from "framer-motion";

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
        className="bg-primary p-2 w-full
       bg-bold text-light 
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
        <Link to={"/"} className="text-2xl font-bold text-center flex gap-2">
          {
            <div className="hidden md:block w-8 h-8">
              <img
                src="/applogo.svg"
                alt="applogo"
                className="w-full h-full object-cover"
              />
            </div>
          }
          <span>Taledo</span>
        </Link>
        <span className="hidden md:block text-xl">{todayDate}</span>
        {isAuth && (
          <button
            className="hidden md:flex text-xl gap-2"
            onClick={() => logoutUser.mutate()}
          >
            <LogoutIcon className="w-8 h-8" />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </>
  );
};

export default NavBar;
