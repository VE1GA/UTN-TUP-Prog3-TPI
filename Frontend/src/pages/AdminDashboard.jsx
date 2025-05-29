import { useNavigate, Routes, Route } from "react-router-dom";

import UserForm from "../components/Dashboard/UserForm";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
        <Route path="administrar_usuarios" element={<UserForm />} />
        {/* <Route path="administrar_palabras" element={<WordForm />} /> */}
      </Routes>
    </>
  );
};

export default AdminDashboard;

// Botones de borrar/agregar palabras y usuarios.
