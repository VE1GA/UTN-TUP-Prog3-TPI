import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Wordle from "./pages/Wordle";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/juego" element={<Wordle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
