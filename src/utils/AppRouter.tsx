import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PageLayout from "../components/layouts/PageLayout";

const AppRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Navigate to={"/dashboard"} /> },
      { path: "/dashboard", element: <DashboardPage /> }
    ]
  }
]);

export default AppRouter;
