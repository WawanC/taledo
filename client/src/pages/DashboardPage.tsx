import { motion } from "framer-motion";
import NewTodoInput from "../components/NewTodoInput";
import TodoList from "../components/TodoList";
import { useGetMeUserQuery } from "../hooks/auth";

const DashboardPage: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();

  return (
    <main
      className="flex flex-col gap-12 items-center py-8 px-4
    text-light bg-semi_bold min-h-screen"
    >
      {getMeQuery.isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <motion.h1
            className="text-4xl text-center break-words w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Hello, {getMeQuery.data?.user.username || "Anonymous"}
          </motion.h1>
          <NewTodoInput className="w-full md:w-1/2" />
          <TodoList className="w-full md:w-1/2" />
        </>
      )}
    </main>
  );
};

export default DashboardPage;
