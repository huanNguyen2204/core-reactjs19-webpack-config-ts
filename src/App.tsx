import "./app.scss";

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to Reactjs core {process.env.DEV}</h1>
      <p>Lets enjoy the core and this game.</p>
      <p className="text-red-500">huan</p>
    </div>
  );
};

export default App;