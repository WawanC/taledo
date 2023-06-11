import { motion } from "framer-motion";
import { useGetMeUserQuery, useLogoutUserMutation } from "../../hooks/auth";
import LogoutIcon from "../../icons/LogoutIcon";
import { useMemo } from "react";

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
        <div className="flex flex-col gap-4 items-center">
          <div className="w-28 h-28">
            <img
              src="/applogo.svg"
              alt="applogo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">
            {getMeUser.data?.user.username || "Username"}
          </h1>
        </div>
        <h2 className="text-xl">{todayDate}</h2>
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
