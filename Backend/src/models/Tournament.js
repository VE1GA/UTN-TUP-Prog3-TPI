import { DataTypes } from "sequelize";

const TournamentModel = (sequelize) => {
  const Tournament = sequelize.define(
    "Tournaments",
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
      teamsInfo: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Tournament;
};
export default TournamentModel;
