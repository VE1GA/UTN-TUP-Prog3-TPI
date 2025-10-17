import "../styles/Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { Validations } from "../utils/Validations";
import { useApi } from "../hooks/useApi";

import WordleLogo from "../assets/wordle.webp";

const Login = () => {
  const navigate = useNavigate();
  const api = useApi();

  const email = useField("email", "email", "example@wordle.com");
  const password = useField("password", "password", "Ingrese su contraseña");

  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email.value,
      password: password.value,
    };

    const errorList = await Validations(formData, "login");

    if (Object.keys(errorList).length > 0) {
      setErrorMessages(errorList);

      if (errorList.email && email.ref.current) {
        email.ref.current.focus();
      } else if (errorList.password && password.ref.current) {
        password.ref.current.focus();
      }
    } else {
      // Credenciales válidas
      setErrorMessages({});
      const user = await api.login(formData);

      // Inicio válido
      if (user) {
        setTimeout(() => {
          if (user.role === "ADMIN") {
            navigate("/admin_dashboard");
          } else {
            navigate("/play");
          }
        }, 1000); // 1 segundo de retraso para que se vea el toast
      }
    }
  };

  return (
    <div className="login-form body">
      <div className="container">
        <h1>Wordle</h1>
        <img src={WordleLogo} alt="Logo de Wordle" />
        <h4>Inicio de sesión</h4>

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>Email: </label>
            <input {...email} />
            {errorMessages.email && <p style={{ color: "red" }}>{errorMessages.email}</p>}
          </div>

          <div>
            <label>Contraseña: </label>
            <input {...password} />
            {errorMessages.password && <p style={{ color: "red" }}>{errorMessages.password}</p>}
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>

        <button onClick={() => navigate("/")}>Volver al inicio</button>
        <p style={{ marginTop: "15px" }}>
          {"¿No tienes una cuenta? "}
          <a href="#" onClick={() => navigate("/registrarse")}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
