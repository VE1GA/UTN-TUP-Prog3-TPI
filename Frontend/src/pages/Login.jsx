import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/Auth/LoginForm";
import ValidationsLogin from "../components/Auth/LoginValidations";

const Login = ({ setIsLoggedIn }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const terminarLogueo = () => {
    navigate("/play");
  };

  const volverAlInicio = () => {
    navigate("/");
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
          console.log("Usuario logueado:", data);
          alert(data.message || "Usuario logueado con éxito");
          if (
            data.message != "Usuario no existente" &&
            data.message != "Email y/o contraseña incorrecta"
          ) {
            setTimeout(terminarLogueo, 1500);
            setIsLoggedIn(true);
          }
        })
        .catch((error) => console.error("Ocurrió un error:", error));
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <LoginForm
          onSubmit={manejarEnvio}
          errores={errores}
          refs={{ emailRef, passwordRef }}
        />

        <button onClick={volverAlInicio}>Volver al inicio</button>
      </div>
    </>
  );
};

export default Login;
