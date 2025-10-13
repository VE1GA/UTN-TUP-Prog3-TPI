import { DataTypes } from "sequelize";

const WordModel = (sequelize) => {
  const Word = sequelize.define(
    "words",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
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
  return Word;
};
export default WordModel;
