import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Player = sequelize.define(
  "players",
  {
    // No necesitamos un 'id' autoincremental aquí.
    // Haremos que el 'userId' sea la clave primaria para asegurar
    // que un usuario solo pueda estar en un equipo.
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    // teamId no puede ser nulo, porque si existe una fila aquí,
    // es porque el usuario pertenece a un equipo.
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "teams",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
