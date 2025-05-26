import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Wordle from "./pages/Wordle";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protected } from "./components/Protected";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Protected>
            <Route path="/juego" element={<Wordle />} />
          </Protected>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
