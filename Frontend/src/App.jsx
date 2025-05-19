import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wordle from "./pages/Wordle";

// import Home from "./pages/Home";
// import Board from "./components/Board";
// import Keyboard from "./components/Keyboard";

function App() {
  return (
    <>
      <div className="App">
        <nav>
          <h1>Wordle</h1>
        </nav>
        <Wordle />
      </div>
    </>
  );
}

export default App;
