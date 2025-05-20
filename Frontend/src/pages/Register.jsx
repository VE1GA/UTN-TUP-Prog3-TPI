import RegisterForm from "../components/registerForm";
import Validations from "../components/Validations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setisLoggedin }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);

  const navegar = useNavigate();

  const GoToProfile = () => {
    navegar("/juego");
  };

  const [errores, setErrores] = useState({});

  const manejarEnvio = (FormData) => {
    const errores = Validations({ datos: FormData });

    if (Object.keys(errores).length > 0) {
      if (errores.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errores.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errores.password && passwordRef.current) {
        passwordRef.current.focus();
      } else if (errores.confirmpassword && confirmpasswordRef.current) {
        confirmpasswordRef.current.focus();
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
        <h1>Registro</h1>
        <RegisterForm
          onSubmit={manejarEnvio}
          errores={errores}
          refs={{ nameRef, emailRef, passwordRef, confirmpasswordRef }}
        />
      </div>
    </>
  );
}

export default Register;
