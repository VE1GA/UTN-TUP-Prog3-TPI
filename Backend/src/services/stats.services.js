import { Stat, User } from "../db.js";

const esDiaConsecutivo = (fechaHoy, fechaUltimaVictoria) => {
  if (!fechaUltimaVictoria) return false;
  const hoy = new Date(fechaHoy);
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const ultimaVictoria = new Date(fechaUltimaVictoria);
  return (
    ayer.getFullYear() === ultimaVictoria.getFullYear() &&
    ayer.getMonth() === ultimaVictoria.getMonth() &&
    ayer.getDate() === ultimaVictoria.getDate()
  );
};

const yaGanoHoy = (fechaHoy, fechaUltimaVictoria) => {
  if (!fechaUltimaVictoria) return false;
  const hoy = new Date(fechaHoy);
  const ultimaVictoria = new Date(fechaUltimaVictoria);
  return (
    hoy.getFullYear() === ultimaVictoria.getFullYear() &&
    hoy.getMonth() === ultimaVictoria.getMonth() &&
    hoy.getDate() === ultimaVictoria.getDate()
  );
};

export const saveGameResult = async (req, res) => {
  const userId = req.user.id; // Viene del verifyToken
  const { didWin, attemptsCount } = req.body; // Del frontend

  try {
    const stats = await Stat.findOne({ where: { userId } });
    if (!stats) {
      return res.status(404).json({ message: "Estadísticas no encontradas" });
    }

    stats.gamesplayed += 1;
    const fechaHoy = new Date().toISOString().split("T")[0];
    const ultimaVictoria = stats.lastWinDate;

    if (didWin) {
      stats.gameswon += 1;
      const currentAttempts = stats.attempts || [];
      const newAttempts = [...stats.attempts, attemptsCount];
      stats.attempts = newAttempts;

      if (yaGanoHoy(fechaHoy, ultimaVictoria)) {
        // No hay que hacer nada porque ya gano hoy
      } else if (esDiaConsecutivo(fechaHoy, ultimaVictoria)) {
        stats.streak += 1;
        stats.lastWinDate = fechaHoy;
      } else {
        stats.streak = 1;
        stats.lastWinDate = fechaHoy;
      }
    } else {
      stats.gameslost += 1;
      stats.streak = 0;
    }

    stats.winrate = (stats.gameswon / stats.gamesplayed) * 100;
    await stats.save();

    res.status(200).json({ message: "Estadísticas actualizadas", stats });
  } catch (error) {
    console.error("Error al guardar estadísticas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getMyStats = async (req, res) => {
  const userId = req.user.id; // Viene del verifyToken

  try {
    // Buscamos las estadísticas y le pedimos que incluya el modelo User
    const stats = await Stat.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"], // Solo traemos estos datos
        },
      ],
    });

    if (!stats) {
      return res.status(404).json({ message: "No se encontraron estadísticas para este usuario." });
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
