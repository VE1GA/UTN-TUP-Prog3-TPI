import { Sequelize } from "sequelize";
import UserModel from "./models/User.js";
import TeamModel from "./models/Team.js";
import TournamentModel from "./models/Tournament.js";
import StatModel from "./models/Stats.js";
import TeamPlayerModel from "./models/TeamPlayer.js";
import WordModel from "./models/Word.js";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./Wordle.db",
  logging: false, // Opcional: para una consola más limpia
});

// 1. Inicializar todos los modelos
export const User = UserModel(sequelize);
export const Team = TeamModel(sequelize);
export const Tournament = TournamentModel(sequelize);
export const Stat = StatModel(sequelize);
export const TeamPlayer = TeamPlayerModel(sequelize);
export const Word = WordModel(sequelize);

// 2. Definir todas las asociaciones en un solo lugar

// --- Asociaciones ---

// 1. User (Manager) <-> Team (Relación Uno a Muchos)
// Un usuario (manager) puede gestionar muchos equipos.
// Un equipo pertenece a un solo usuario (su manager).
User.hasMany(Team, {
  foreignKey: "eventmanagerId",
  as: "managedTeams", // Alias para cuando consultes los equipos de un manager
});
Team.belongsTo(User, {
  foreignKey: "eventmanagerId",
  as: "manager", // Alias para cuando consultes el manager de un equipo
});

// 2. User (Player) <-> Team (Relación Muchos a Muchos)
// Un usuario puede estar en muchos equipos y un equipo tiene muchos usuarios.
// Se usa el modelo 'TeamPlayer' como tabla de unión explícita.
User.belongsToMany(Team, {
  through: TeamPlayer,
  foreignKey: "userId",
  as: "teams",
});
Team.belongsToMany(User, {
  through: TeamPlayer,
  foreignKey: "teamId",
  as: "players",
});

// 3. User (Player) <-> Stats (Relación Uno a Uno)
// Un usuario tiene una única tabla de estadísticas.
User.hasOne(Stat, { foreignKey: "userId" });
Stat.belongsTo(User, { foreignKey: "userId" });

// 4. Team <-> Tournament (Relación Muchos a Muchos)
// Un torneo tiene muchos equipos y un equipo puede estar en muchos torneos.
// Sequelize creará automáticamente una tabla intermedia 'tournament_teams'.
Tournament.belongsToMany(Team, { through: "tournament_teams" });
Team.belongsToMany(Tournament, { through: "tournament_teams" });

// 5. Team <-> Stats (Relación Uno a Uno)
// Un equipo tiene una única tabla de estadísticas.
Team.hasOne(Stat, { foreignKey: "teamId" });
Stat.belongsTo(Team, { foreignKey: "teamId" });
