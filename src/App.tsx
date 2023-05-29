const App = () => {
  return (
    <main>
      <h1 className="text-4xl">Taledo Client</h1>
      <h2 className="text-2xl">App Name : {import.meta.env.VITE_APP_TITLE}</h2>
    </main>
  );
};

export default App;
