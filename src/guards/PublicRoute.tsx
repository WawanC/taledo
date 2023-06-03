import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetMeUserQuery } from "../hooks/auth";

const PublicRoute = () => {
  const getMeQuery = useGetMeUserQuery({ key: "public-me" });
  const navigate = useNavigate();

  useEffect(() => {
    if (getMeQuery.isSuccess) return navigate("/dashboard");
  }, [getMeQuery.isSuccess, navigate]);

  return getMeQuery.isFetching || getMeQuery.isSuccess ? (
    <main className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </main>
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
