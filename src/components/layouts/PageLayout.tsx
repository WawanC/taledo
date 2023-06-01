import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const PageLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PageLayout;
