import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const volverAlInicio = () => {
    navigate("/");
  };

  return (
    <div>
      <h1> Error 404: La página solicitada no fue encontrada</h1>

      <img
        src="../facepalm.webp"
        style={{
          display: "block",
          paddingBottom: "10px",
          width: "200px",
          height: "auto",
        }}
      />

      <button onClick={volverAlInicio}>Volver al inicio</button>
    </div>
  );
};

export default NotFound;
