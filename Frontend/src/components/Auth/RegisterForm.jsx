import { useState } from "react";

const RegisterForm = ({ onSubmit, errores, refs }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          ref={refs.nameRef}
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
          ref={refs.emailRef}
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
          ref={refs.passwordRef}
        />
        {errores.password && <p style={{ color: "red" }}>{errores.password}</p>}
      </div>
      <div>
        <label>Confirmar Contraseña: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          ref={refs.confirmpasswordRef}
        />
        {errores.confirmPassword && (
          <p style={{ color: "red" }}>{errores.confirmPassword}</p>
        )}
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default RegisterForm;
