import "../styles/AdminDashboard.css";

import { useNavigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import UsersManage from "../components/Dashboard/UsersManage";
import WordsManage from "../components/Dashboard/WordsManage";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      navigate("/iniciar_sesion");
      return;
    }

    try {
      const user = JSON.parse(userString);
      if (user.role !== "ADMIN") {
        navigate("/"); // O a una página de "Acceso Denegado"
      }
    } catch (error) {
      navigate("/iniciar_sesion"); // Si hay error parseando el usuario
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="title">Dashboard de administrador</h1>
        <div className="dosbotones">
          <button
            className="botones"
            onClick={() => navigate("/admin_dashboard/administrar_usuarios")}
          >
            Administrar cuentas de usuario
          </button>
          <button
            className="botones"
            onClick={() => navigate("/admin_dashboard/administrar_palabras")}
          >
            Administrar banco de palabras
          </button>
        </div>

        <Routes>
          <Route path="administrar_usuarios" element={<UsersManage />} />
          <Route path="administrar_palabras" element={<WordsManage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
