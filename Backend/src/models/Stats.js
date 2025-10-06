import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Stat = sequelize.define(
  "stats",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gamesplayed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameswon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameslost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    winrate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    //ATTEMPTS (DEFINIR BIEN QUE ES) OBJECT
  },
  {
    timestamps: false,
  }
);
