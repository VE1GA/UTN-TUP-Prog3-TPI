import { useEffect, useState, useRef } from "react";

import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import Validations from "../Auth/RegisterValidations";

const UserInputs = ({
  idEdit,
  esEditado,
  nameEdit,
  emailEdit,
  roleEdit,
  usuarioFetch,
  setEsEditado,
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

  useEffect(() => {
    setFormData({
      name: esEditado.name,
      email: esEditado.email,
      password: "",
      role: esEditado.role === "ADMIN",
    });
  }, []);

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

  const handleSubmit = (e) => {
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

      setFormData({
        ...formData,
        role: formData.role ? "ADMIN" : "USER",
      });

      fetch(`http://localhost:3000/users/${esEditado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      usuarioFetch();
      setEsEditado({ id: "", name: "", email: "", role: "", esEditado: false });
      alert(`Usuario ${formData.name} modificado correctamente`);
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
      <button onClick={() => setEsEditado({ esEditado: false })}>
        <Icon.XCircleFill color="#FF3333" size={20} />
      </button>
    </form>
  );
};

export default UserInputs;
