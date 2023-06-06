import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useGetMeUserQuery } from "../../hooks/auth";

const PageLayout: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();

  return getMeQuery.isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PageLayout;
