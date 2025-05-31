import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { getToken, checkToken } from "../../services/Token.services";

import Validations from "../Auth/RegisterValidations";

const UsersForm = ({ userTemporal, setUserTemporal, getUsersList }) => {
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
  const navigate = useNavigate();

  const tipoLlamada = userTemporal.creando ? "Creando" : "Editando";

  let endpoint;
  let metodo;
  let mensaje;

  let token;

  useEffect(() => {
    setFormData({
      name: userTemporal.name,
      email: userTemporal.email,
      password: "",
      role: userTemporal.role === "ADMIN",
    });
  }, [userTemporal]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const checkHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

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

      if (tipoLlamada === "Creando") {
        endpoint = "http://localhost:3000/register";
        metodo = "POST";
        mensaje = "se añadió correctamente";
      } else if (tipoLlamada === "Editando") {
        endpoint = `http://localhost:3000/users/${userTemporal.id}`;
        metodo = "PUT";
        mensaje = "se modificó correctamente";
        token = getToken(navigate);
      }

      const response = await fetch(endpoint, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosEnviar),
      });

      checkToken(response, navigate);
      getUsersList();

      setUserTemporal({
        id: "",
        name: "",
        email: "",
        role: "",
        creando: false,
        editando: false,
      });
      alert(`${datosEnviar.role} ${datosEnviar.name} ${mensaje}`);
    }
  };

  return (
    <form onSubmit={submitHandler} noValidate>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
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
          onChange={changeHandler}
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
          onChange={changeHandler}
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
          onChange={checkHandler}
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

export default UsersForm;
