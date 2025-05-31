import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Página principal 🏠</h1>
      <button onClick={() => navigate("/registrarse")}>Registrarse</button>
      <button onClick={() => navigate("/iniciar_sesion")}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default Home;
