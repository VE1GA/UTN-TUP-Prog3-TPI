import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenido a Wordle</h1>
      <img src="wordle.png" alt="" />
      <h3> Seleccione una opción</h3>
      <div className="botones">
        <button onClick={() => navigate("/registrarse")}>Registrarse</button>
        <button onClick={() => navigate("/iniciar_sesion")}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
