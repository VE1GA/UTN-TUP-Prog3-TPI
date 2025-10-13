import { DataTypes } from "sequelize";

const StatModel = (sequelize) => {
  const Stat = sequelize.define(
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
      attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Esta columna se agregará para la relación con Team
      teamId: {
        type: DataTypes.INTEGER,
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
  return Stat;
};
export default StatModel;
