import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./utils/AppRouter";
import useAppState from "./stores/app";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useAppState((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
};

export default App;
