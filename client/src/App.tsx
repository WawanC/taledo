import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./utils/AppRouter";
import useAppState from "./stores/app";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const darkMode = useAppState((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
};

export default App;
