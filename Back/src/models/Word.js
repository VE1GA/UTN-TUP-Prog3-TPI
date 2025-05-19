import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Word = sequelize.define(
  "word",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    luck: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);
