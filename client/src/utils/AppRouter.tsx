import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PageLayout from "../components/layouts/PageLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../guards/PrivateRoute";
import PublicRoute from "../guards/PublicRoute";
import AccountPage from "../pages/AccountPage";

const AppRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/account", element: <AccountPage /> }
        ]
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "/", element: <Navigate to={"/dashboard"} /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> }
        ]
      }
    ]
  }
]);

export default AppRouter;
