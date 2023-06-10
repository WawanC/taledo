import { useMemo } from "react";
import { useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import useAuthStore from "../../stores/auth";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const logoutUser = useLogoutUserMutation();
  const isAuth = useAuthStore().isAuth;

  const todayDate = useMemo(
    () =>
      new Date().toLocaleDateString("us", {
        dateStyle: "full"
      }),
    []
  );

  return (
    <nav
      className="bg-primary p-2 w-full
     bg-bold text-light 
     flex justify-center md:justify-between items-center 
     px-8"
    >
      <Link to={"/"} className="text-2xl font-bold text-center">
        Taledo
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
  );
};

export default NavBar;
