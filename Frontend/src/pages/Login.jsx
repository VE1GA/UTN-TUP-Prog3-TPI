import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Auth/LoginForm";
import ValidationsLogin from "../components/Auth/LoginValidations";

import "../styles/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const terminarLogueo = (userRole) => {
    if (userRole === "ADMIN") {
      navigate("/admin_dashboard");
    } else {
      navigate("/play");
    }
  };

  const [errores, setErrores] = useState({});

  const manejarEnvio = (FormData) => {
    const errores = ValidationsLogin({ datos: FormData });

    if (Object.keys(errores).length > 0) {
      if (errores.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errores.password && passwordRef.current) {
        passwordRef.current.focus();
      }

      setErrores(errores);
    } else {
      setErrores({});
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      })
        .then((res) => res.json())

        .then((data) => {
          if (data.token && data.user) {
            console.log("[Login Page] Token recibido del backend:", data.token);
            console.log("Usuario logueado:", data);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsLoggedIn(true);
            alert(data.message || "Usuario logueado con éxito");
            // Redirigir después de un breve retraso
            setTimeout(() => terminarLogueo(data.user.role), 1000);
          } else {
            // Manejar errores de login (ej. credenciales incorrectas)
            console.error("Error de login:", data.message);
            alert(data.message || "Error al iniciar sesión");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            setIsLoggedIn(true);
          }
        })
        .catch((error) => console.error("Ocurrió un error:", error));
    }
  };

  return (
    <>
      <div>
        <LoginForm
          onSubmit={manejarEnvio}
          errores={errores}
          refs={{ emailRef, passwordRef }}
        />
      </div>
    </>
  );
};

export default Login;
