import { useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import useAuthStore from "../../stores/auth";

const NavBar: React.FC = () => {
  const logoutUser = useLogoutUserMutation();
  const isAuth = useAuthStore().isAuth;

  return (
    <nav className="bg-primary p-2 w-full relative">
      <h1 className="text-2xl font-bold text-center">Taledo</h1>
      {isAuth && (
        <button
          className="absolute right-2 md:right-4 top-0 bottom-0 text-xl"
          onClick={() => logoutUser.mutate()}
        >
          <LogoutIcon className="w-8 h-8" />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
