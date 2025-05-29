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

        <p>
          <br />
          <br />
          <br />
          Botón supersecreto 🤫
        </p>
        <button
          onClick={() => {
            navigate("/admin_dashboard");
          }}
        >
          🛠️
        </button>
      </div>
    </>
  );
};

export default Home;
