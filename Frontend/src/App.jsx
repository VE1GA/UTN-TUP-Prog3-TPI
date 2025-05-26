import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProtected from "./components/UserProtected";
import Wordle from "./pages/Wordle";
import NotFound from "./pages/NotFound";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/registrarse"
            element={<Register setIsLoggedIn={setUsuarioLogueado} />}
          />
          <Route
            path="/iniciar_sesion"
            element={<Login setIsLoggedIn={setUsuarioLogueado} />}
          />
          <Route
            path="/play"
            element={
              <UserProtected isLoggedIn={usuarioLogueado}>
                <Wordle />
              </UserProtected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
