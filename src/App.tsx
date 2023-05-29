import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <main className="flex flex-col gap-4 items-center">
      <NavBar />
      <section className="px-2 w-full md:w-1/2">
        <TodoList />
      </section>
    </main>
  );
};

export default App;
