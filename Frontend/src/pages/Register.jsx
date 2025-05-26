import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/registerForm";
import Validations from "../components/Validations";

function Register({ setIsLoggedIn }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);

  const navigate = useNavigate();

  const terminarRegistro = () => {
    navigate("/juego");
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
      setErrores({});

      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      })
        .then((res) => res.json())

        .then((data) => {
          console.log("Usuario registrado:", data);
          alert(data.message || "Usuario registrado con éxito!");
        })

        .catch((error) => console.error("Ocurrió un error:", error));

      setTimeout(terminarRegistro, 3000);
      setIsLoggedIn(true);
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
