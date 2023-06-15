import { AnimatePresence, motion } from "framer-motion";
// import NewTodoInput from "../components/NewTodoInput";
import TodoList from "../components/TodoList";
import { useGetMeUserQuery } from "../hooks/auth";
import NewTodoModal from "../components/NewTodoModal";
import { useState } from "react";

const DashboardPage: React.FC = () => {
  const getMeQuery = useGetMeUserQuery();
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <main
      className="flex flex-col gap-12 items-center py-8 px-4
    text-light bg-semi_bold flex-1"
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
          {/* <NewTodoInput className="w-full md:w-1/2" /> */}
          <button
            className="bg-bold py-2 px-4 text-xl font-bold rounded shadow"
            onClick={() => setIsShowModal(true)}
          >
            Create Todo
          </button>
          <AnimatePresence>
            {isShowModal && (
              <NewTodoModal onClose={() => setIsShowModal(false)} />
            )}
          </AnimatePresence>
          <TodoList className="w-full md:w-1/2" />
        </>
      )}
    </main>
  );
};

export default DashboardPage;
