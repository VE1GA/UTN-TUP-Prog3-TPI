import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, checkToken } from "../services/Token.services";

import "../styles/Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken(navigate);
      if (!token) return;

      try {
        setError(null);
        setLoading(true);

        const response = await fetch("http://localhost:3000/my_stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        checkToken(response, navigate);

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error("Error en fetchProfile:", err);
        setError(err.message || "Ocurrió un error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-container">
        <h1>Cargando perfil...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <h1>Error al cargar el perfil: {error}</h1>
      </div>
    );
  }

  if (!profileData || !profileData.user) {
    return (
      <div className="profile-container">
        <h1>No se encontraron datos del perfil.</h1>
      </div>
    );
  }

  const { user, gamesplayed, gameswon, gameslost, winrate, streak } = profileData;

  return (
    <div className="profile-container">
      <h1>
        Perfil de <span className="profile-username">{user.name}</span>
      </h1>

      <div className="profile-card">
        <h2>Datos de la Cuenta</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rol:</strong> {user.role}
        </p>
      </div>

      <div className="profile-card">
        <h2>Estadísticas del Juego</h2>
        <div className="stats-grid">
          <p>
            <strong>Partidas jugadas:</strong> {gamesplayed}
          </p>
          <p>
            <strong>Partidas ganadas:</strong> {gameswon}
          </p>
          <p>
            <strong>Partidas perdidas:</strong> {gameslost}
          </p>
          <p>
            <strong>Porcentaje de victorias:</strong> {winrate ? winrate.toFixed(1) : 0}%
          </p>
          <p className="stat-streak">
            <strong>Racha Actual:</strong> {streak} 🔥
          </p>
        </div>
      </div>

      <button className="profile-button" onClick={() => navigate("/play")}>
        Volver al Juego
      </button>
    </div>
  );
};

export default Profile;
