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
    <>
      <h1>Bienvenido administrador ⚙️</h1>
      <img
        src="../admin.webp"
        style={{
          display: "block",
          paddingBottom: "10px",
          width: "200px",
          height: "auto",
        }}
      />
      <button onClick={() => navigate("/admin_dashboard/administrar_usuarios")}>
        Administrar cuentas de usuario
      </button>
      <button onClick={() => navigate("/admin_dashboard/administrar_palabras")}>
        Administrar palabras
      </button>

      <Routes>
        <Route path="administrar_usuarios" element={<UsersManage />} />
        <Route path="administrar_palabras" element={<WordsManage />} />
      </Routes>
    </>
  );
};

export default AdminDashboard;

// Botones de borrar/agregar palabras y usuarios.
