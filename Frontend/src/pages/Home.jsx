import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Página principal 🏠</h1>
        <button
          onClick={() => {
            navigate("/registrarse");
          }}
        >
          Registrarse
        </button>

        <button
          onClick={() => {
            navigate("/iniciar_sesion");
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </>
  );
};

export default Home;
