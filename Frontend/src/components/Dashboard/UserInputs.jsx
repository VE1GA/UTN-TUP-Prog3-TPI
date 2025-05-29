import { useEffect, useState, useRef } from "react";
import Validations from "../Auth/RegisterValidations";

const UserInputs = ({
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

  const { id } = formData;

  useEffect(() => {
    setFormData({
      name: nameEdit,
      email: emailEdit,
    });
    if (roleEdit === "USER") {
      setFormData((prev) => ({ ...prev, role: false }));
    } else {
      setFormData((prev) => ({ ...prev, role: true }));
    }
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
    const errores = Validations({ datos: FormData });

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
      fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      usuarioFetch();
      setEsEditado((prev) => ({ ...prev, esEditado: false }));
      alert("Cambios guardados");
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
        <label>
          <input
            type="checkbox"
            checked={formData.role}
            onChange={handleCheck}
            name="role"
            value={formData.role}
            ref={checkRef}
          />
          Es admin?
        </label>
      </div>
      <button type="submit">Cambios confirmar</button>
    </form>
  );
};

export default UserInputs;
