import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Tournament = sequelize.define(
  "teams",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
