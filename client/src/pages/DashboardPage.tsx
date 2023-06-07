import NewTodoInput from "../components/NewTodoInput";
import TodoList from "../components/TodoList";
import { useGetMeUserQuery } from "../hooks/auth";

const DashboardPage: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();

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
