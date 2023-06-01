import NewTodoInput from "../components/NewTodoInput";
import TodoList from "../components/TodoList";

const DashboardPage: React.FC = () => {
  return (
    <main className="flex flex-col gap-4 items-center p-4">
      <NewTodoInput className="w-full md:w-1/2" />
      <TodoList className="w-full md:w-1/2" />
    </main>
  );
};

export default DashboardPage;
