import { useEffect } from "react";
import NewTodoInput from "../components/NewTodoInput";
import TodoList from "../components/TodoList";
import { useGetMeUserQuery } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (getMeQuery.isError) navigate("/login");
    if (getMeQuery.isFetching) return;
    console.log(getMeQuery.data);
  }, [getMeQuery.data, getMeQuery.isFetching, getMeQuery.isError, navigate]);

  return (
    <main className="flex flex-col gap-4 items-center p-4">
      {getMeQuery.isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-4xl mb-4 text-center">
            Hello, {getMeQuery.data?.user.username || "Anonymous"}
          </h1>
          <NewTodoInput className="w-full md:w-1/2" />
          <TodoList className="w-full md:w-1/2" />
        </>
      )}
    </main>
  );
};

export default DashboardPage;
