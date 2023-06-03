import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMeUserQuery } from "../hooks/auth";

const PrivateRoute = () => {
  const getMeQuery = useGetMeUserQuery({ key: "private-me" });
  const navigate = useNavigate();

  useEffect(() => {
    if (getMeQuery.isError) return navigate("/login");
  }, [getMeQuery.isError, navigate]);

  return getMeQuery.isFetching || getMeQuery.isError ? (
    <main className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </main>
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
