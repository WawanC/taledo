import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/auth";

const PublicRoute = () => {
  const isAuth = useAuthStore().isAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      return navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  return <Outlet />;
};

export default PublicRoute;
