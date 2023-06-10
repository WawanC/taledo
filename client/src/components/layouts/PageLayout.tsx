import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { useGetMeUserQuery } from "../../hooks/auth";

const PageLayout: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();
  const location = useLocation();

  return getMeQuery.isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {location.pathname.includes("/login") &&
        location.pathname.includes("/register") && <NavBar />}
      <Outlet />
    </>
  );
};

export default PageLayout;
