import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");

  if (!userString || !token) {
    console.warn("[AUTH] No existe un usuario o token, redirigiendo a /iniciar_sesion");
    return <Navigate to="/iniciar_sesion" replace />;
  }

  const user = JSON.parse(userString);
  console.log("[AUTH] Usuario:", user);

  if (!allowedRoles.includes(user.role)) {
    console.warn(
      "[AUTH] El usuario no tiene permisos suficientes para acceder, redirigiendo a /iniciar_sesion"
    );
    return <Navigate to="/iniciar_sesion" replace />;
  }

  console.info("[AUTH] Acceso permitido");

  return children;
};

export default ProtectedRoute;
