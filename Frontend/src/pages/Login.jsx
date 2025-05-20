import LoginForm from "../components/LoginForm";
import Validations from "../components/Validations";
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
    const errores = Validations({ datos: FormData });

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
      // setTimeout(GoToProfile, 2000);
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
