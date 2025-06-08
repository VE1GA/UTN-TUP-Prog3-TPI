import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit, errores, refs }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
    <div className="login-form body">
      <div className="container">
        <h1>Wordle</h1>
        <img src="wordle.png" alt="" />
        <h4>Inicio de sesión</h4>

        <form onSubmit={handleSubmit} noValidate>
          <div>
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
              {errores.password && (
                <p style={{ color: "red" }}>{errores.password}</p>
              )}
            </div>

            <button type="submit">Iniciar sesión</button>
          </div>
        </form>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default LoginForm;
