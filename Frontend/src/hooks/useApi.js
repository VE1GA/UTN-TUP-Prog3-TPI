import { useToast } from "./useToast";

export const useApi = () => {
  const API_URL = "http://localhost:3000/";
  const getApiUrl = (path) => `${API_URL}${path}`;
  const { showSuccessToast, showErrorToast } = useToast();

  const login = async (formData) => {
    try {
      const response = await fetch(getApiUrl("login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor. Código: " + response.status);
      }

      const data = await response.json();

      if (data.user && data.token) {
        // Sesión iniciada correctamente
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);

        showSuccessToast(data.message || "Usuario logueado con éxito");

        return data.user;
      } else {
        // Credenciales incorrectas
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        showErrorToast(data.message || "Error al iniciar sesión");

        return null;
      }
    } catch (error) {
      console.error("Ocurrió un error en la conexión:", error);

      showErrorToast(error.message || "Ocurrió un error de conexión");

      return null;
    }
  };

  return { login };
};
