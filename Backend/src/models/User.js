import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { UserRoles } from "../enums/enums.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define(
  "users",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserRoles)),
      allowNull: false,
      defaultValue: UserRoles.USER,
    },
  },
  {
    timestamps: false,
  }
);

export const hashPassword = async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
};

// Hook para hashear la contraseña antes de guardar
User.beforeCreate(hashPassword);
