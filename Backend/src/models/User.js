import { DataTypes } from "sequelize";
import { UserRoles } from "../enums/enums.js";
import bcrypt from "bcryptjs";

const UserModel = (sequelize) => {
  const User = sequelize.define(
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
      },
    },
    {
      timestamps: false,
    }
  );

  // Hasheo de contraseña
  const hashPassword = async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  };

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  return User;
};

export default UserModel;
