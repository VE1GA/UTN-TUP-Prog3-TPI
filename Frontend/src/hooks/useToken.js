import { useNavigate } from "react-router-dom";

export const useToken = () => {
  const navigate = useNavigate();

  // Función que debe llamarse antes de realizar un fetch para obtener el token que permite su autorización.

  const get = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No se encontró un token. Redirigiendo al inicio de sesión.");
      navigate("/iniciar_sesion");
      return;
    }

    return token;
  };

  // Función que debe llamarse luego de realizar un fetch para verificar que el token no sea inválido o haya expirado.
  // La función debe recibir 'response' como prop, usando 'const response = fetch(http://...)' cuando sea necesario

  const check = (response) => {
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.info("Token inválido o expirado. Redirigiendo al inicio de sesión.");

        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        navigate("/iniciar_sesion");
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  return { get, check };
};
