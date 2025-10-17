import "../styles/NotFound.css";

import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const volverAlInicio = () => {
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <img src="../error.png" alt="Error 404" />
      <h1>Error 404: La página solicitada no fue encontrada</h1>
      <button onClick={volverAlInicio}>Volver al inicio</button>
    </div>
  );
};

export default NotFound;
