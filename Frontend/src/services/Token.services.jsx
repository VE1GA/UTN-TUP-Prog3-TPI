// Función que debe llamarse antes de realizar un fetch para obtener el token que permite su autorización.
// Retorna el propio token, asi que la llamada debería ser algo como 'const token = getToken(navigate)'
export const getToken = (navigate) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No se encontró un token. Redirigiendo al inicio de sesión.");
    navigate("/iniciar_sesion");
    return;
  } else {
    return token;
  }
};

// Función que debe llamarse luego de realizar un fetch para verificar que el token no sea inválido o haya expirado.
// La función debe recibir 'response' como prop, usando 'const response = fetch(http://...)' cuando sea necesario
// Luego llamarlo con fetchToken(response, navigate)
export const checkToken = (response, navigate) => {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      console.info(
        "Token inválido o expirado. Redirigiendo al inicio de sesión."
      );

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      navigate("/iniciar_sesion");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
