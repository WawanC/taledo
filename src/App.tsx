import { QueryClient, QueryClientProvider } from "react-query";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";
import NewTodoInput from "./components/NewTodoInput";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col gap-4 items-center">
        <NavBar />
        <section className="px-2 w-full md:w-1/2 flex flex-col gap-4">
          <NewTodoInput />
          <TodoList />
        </section>
      </main>
    </QueryClientProvider>
  );
};

export default App;
