import LoginForm from "../components/LoginForm";
import ValidationsLogin from "../components/ValidationsLogin";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setisLoggedin }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navegar = useNavigate();

  const GoToProfile = () => {
    navegar("/juego");
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
      alert("Formulario enviado con éxito");
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
        })

        .catch((error) => console.error("Ocurrió un error:", error));
      setTimeout(GoToProfile, 2000);
      setisLoggedin(true);
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
      </div>
    </>
  );
}

export default Login;
