import { DataTypes } from "sequelize";

const TeamModel = (sequelize) => {
  const Team = sequelize.define(
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
      eventmanagerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Team;
};
export default TeamModel;
