import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>BIENVENIDO 👋</h1>
        <button
          onClick={() => {
            navigate("/registro");
          }}
        >
          Registrarse
        </button>

        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Logearse
        </button>

        {/* <nav>
          <h1>Wordle</h1>
        </nav>
        <Wordle /> */}
      </div>
    </>
  );
};

export default Home;
