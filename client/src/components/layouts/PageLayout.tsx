import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { useGetMeUserQuery } from "../../hooks/auth";
import Loader from "../Loader";
import SideMenu from "./SideMenu";

const PageLayout: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();
  const location = useLocation();

  return getMeQuery.isLoading ? (
    <main className="w-screen h-screen flex justify-center items-center bg-bold">
      <Loader />
    </main>
  ) : location.pathname.includes("/login") ||
    location.pathname.includes("/register") ? (
    <Outlet />
  ) : (
    <div className="flex flex-1">
      <SideMenu />
      <div className="flex flex-col flex-1">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
