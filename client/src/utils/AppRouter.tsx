import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import PageLayout from "../components/layouts/PageLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "../guards/PrivateRoute";
import PublicRoute from "../guards/PublicRoute";

const AppRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [{ path: "/dashboard", element: <DashboardPage /> }]
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "/register", element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> }
        ]
      }
    ]
  }
]);

export default AppRouter;
