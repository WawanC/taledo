import { motion } from "framer-motion";
import { useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";

interface Props {
  onClose: () => void;
}

const SideNav: React.FC<Props> = (props) => {
  const logoutUser = useLogoutUserMutation();

  return (
    <nav className="fixed inset-0 z-10 text-light">
      <div
        className="bg-black opacity-50 w-full h-full"
        onClick={props.onClose}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[60%] bg-bold
      flex flex-col items-center py-20 gap-12"
        initial={{ x: "-100%" }}
        animate={{ x: "0" }}
        exit={{ x: "-100%" }}
        transition={{ bounce: false, duration: 0.25 }}
      >
        <h1 className="text-2xl font-bold">Username</h1>
        <h2 className="text-xl">22 June 2023</h2>
        <ul className="flex flex-col">
          <button
            className="flex text-xl gap-2"
            onClick={() => logoutUser.mutate()}
          >
            <LogoutIcon className="w-8 h-8" />
            <span>Logout</span>
          </button>
        </ul>
      </motion.div>
    </nav>
  );
};

export default SideNav;
