import { Sequelize } from "sequelize";
// import { User } from "./models/User.js";
// import { Team } from "./models/Team.js";
// import { Player } from "./models/Player.js";
// import { Tournament } from "./models/Tournament.js";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./Wordle.db",
});

// --- Asociaciones ---

// // Un equipo (Team) tiene muchos miembros (TeamMember).
// Team.hasMany(Player, { foreignKey: "teamId" });
// Player.belongsTo(Team, { foreignKey: "teamId" });

// // Un usuario (User) puede ser un miembro de equipo (TeamMember).
// User.hasOne(Player, { foreignKey: "userId" });
// Player.belongsTo(User, { foreignKey: "userId" });

// // --- Asociaciones de Torneos ---

// // Un torneo puede tener muchos equipos y un equipo puede estar en muchos torneos.
// Tournament.belongsToMany(Team, { through: "tournament_teams" });
// Team.belongsToMany(Tournament, { through: "tournament_teams" });
