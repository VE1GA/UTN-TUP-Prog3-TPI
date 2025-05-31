import { useEffect, useState, useRef } from "react";

import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import Validations from "../Auth/RegisterValidations";

const UserForm = ({
  tipoLlamada,
  getUserList,
  userTemporal,
  setUserTemporal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: false,
  });
  const [errores, setErrores] = useState({});

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const checkRef = useRef(null);

  if (tipoLlamada === "Editar") {
    useEffect(() => {
      setFormData({
        name: userTemporal.name,
        email: userTemporal.email,
        password: "",
        role: userTemporal.role === "ADMIN",
      });
    }, []);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const errores = Validations(formData);

    if (Object.keys(errores).length > 0) {
      if (errores.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errores.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errores.password && passwordRef.current) {
        passwordRef.current.focus();
      }

      setErrores(errores);
    } else {
      setErrores({});

      const datosEnviar = {
        ...formData,
        role: formData.role ? "ADMIN" : "USER",
      };

      if (tipoLlamada === "Crear") {
        await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        });
        getUserList();
        setUserTemporal({
          id: "",
          name: "",
          email: "",
          role: "",
          userTemporal: false,
        });
        alert(`${datosEnviar.role} ${datosEnviar.name} creado correctamente`);
      }

      if (tipoLlamada === "Editar") {
        await fetch(`http://localhost:3000/users/${userTemporal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        });
        getUserList();
        setUserTemporal({
          id: "",
          name: "",
          email: "",
          role: "",
          creando: false,
          editando: false,
        });
        alert(
          `${datosEnviar.role} ${datosEnviar.name} modificado correctamente`
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          ref={nameRef}
        />
        {errores.name && <p style={{ color: "red" }}>{errores.name}</p>}
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          ref={emailRef}
        />
        {errores.email && <p style={{ color: "red" }}>{errores.email}</p>}
      </div>

      <div>
        <label>Contraseña: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          ref={passwordRef}
        />
        {errores.password && <p style={{ color: "red" }}>{errores.password}</p>}
      </div>

      <div>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="¿Es administrador?"
          checked={formData.role}
          onChange={handleCheck}
          name="role"
          value={formData.role}
          ref={checkRef}
        />
      </div>
      <button type="submit">
        <Icon.CheckCircleFill color="#0FC41A" size={20} />
      </button>
      <button
        onClick={() =>
          setUserTemporal({
            ...userTemporal,
            editando: false,
            creando: false,
          })
        }
      >
        <Icon.XCircleFill color="#FF3333" size={20} />
      </button>
    </form>
  );
};

export default UserForm;
