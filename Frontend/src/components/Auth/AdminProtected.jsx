import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userString = localStorage.getItem("user");
  console.log("[AdminProtected] Token:", token);
  console.log("[AdminProtected] User String:", userString);

  if (!token || !userString) {
    console.log(
      "[AdminProtected] No token or userString, redirecting to /iniciar_sesion"
    );
    return <Navigate to="/iniciar_sesion" replace />;
  }

  try {
    const user = JSON.parse(userString);
    console.log("[AdminProtected] Parsed User:", user);
    if (user.role !== "ADMIN") {
      // Podrías redirigir a una página de "No autorizado" o a la home.
      console.log("[AdminProtected] User role is not ADMIN, redirecting to /");
      return <Navigate to="/" replace />;
    }
    console.log("[AdminProtected] User is ADMIN, allowing access.");
  } catch (error) {
    // Si hay un error al parsear el usuario, es mejor desloguear y redirigir.
    console.error("[AdminProtected] Error parsing userString:", error);
    console.log(
      "[AdminProtected] Redirecting to /iniciar_sesion due to parse error."
    );
    return <Navigate to="/iniciar_sesion" replace />;
  }

  return children;
};

export default AdminProtected;
