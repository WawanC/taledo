import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PageLayout from "../components/layouts/PageLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const AppRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Navigate to={"/dashboard"} /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> }
    ]
  }
]);

export default AppRouter;
