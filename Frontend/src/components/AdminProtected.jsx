import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    return <Navigate to="/iniciar_sesion" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (user.role !== "ADMIN") {
      // Podrías redirigir a una página de "No autorizado" o a la home.
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // Si hay un error al parsear el usuario, es mejor desloguear y redirigir.
    return <Navigate to="/iniciar_sesion" replace />;
  }

  return children;
};

export default AdminProtected;
