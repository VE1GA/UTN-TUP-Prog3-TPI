import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wordle from "./pages/Wordle";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import UserProtected from "./components/UserProtected";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
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
