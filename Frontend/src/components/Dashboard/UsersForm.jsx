import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { getToken, checkToken } from "../../services/Token.services";

import Validations from "../Auth/RegisterValidations";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersForm = ({ userTemporal, getUsersList, onSaveSuccess, onCancel }) => {
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
        toast.error(errores.name, {
          toastId: "valueError",
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
      } else if (errores.email && emailRef.current) {
        emailRef.current.focus();
        toast.error(errores.email, {
          toastId: "valueError",
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
      } else if (errores.password && passwordRef.current) {
        passwordRef.current.focus();
        toast.error(errores.password, {
          toastId: "valueError",
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
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

      onSaveSuccess();
      alert(`${datosEnviar.role} ${datosEnviar.name} ${mensaje}`);
    }
  };

  return (
    <form onSubmit={submitHandler} noValidate>
      <div>
        <h1>
          {" "}
          {userTemporal.creando ? "Creando usuario" : "Editando usuario"}{" "}
        </h1>

        <label>Nombre: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          ref={nameRef}
        />
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
      </div>

      <div className="switch-container">
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
        <Icon.CheckCircleFill color="#0FC41A" size={40} />
      </button>
      <button type="button" onClick={onCancel}>
        {" "}
        {}
        <Icon.XCircleFill color="#FF3333" size={40} />
      </button>
    </form>
  );
};

export default UsersForm;
