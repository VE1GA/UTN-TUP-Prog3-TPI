import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wordle from "./pages/Wordle";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import UserProtected from "./components/Auth/UserProtected";
import AdminProtected from "./components/Auth/AdminProtected";
import { Ranking } from "./pages/Ranking";
import { Perfil } from "./pages/Perfil";
import { Equipos } from "./pages/Equipos";

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/admin_dashboard/*"
            element={
              <AdminProtected>
                <AdminDashboard />
              </AdminProtected>
            }
          />
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

      <ToastContainer />
    </>
  );
}

export default App;
