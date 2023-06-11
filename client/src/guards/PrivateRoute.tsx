import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/auth";

const PrivateRoute = () => {
  const isAuth = useAuthStore().isAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return navigate("/login");
  }, [isAuth, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
