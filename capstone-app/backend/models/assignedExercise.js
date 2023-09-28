const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user")
const Exercise = require("./exercise")
class AssignedExercise extends Model {}

AssignedExercise.init(
  {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    ExerciseId: {
      type: DataTypes.INTEGER, 
      references: {
        model: Exercise,
        key: "id",
      },
    },
    assignedDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false, 
    },
  
  },
  {
    sequelize: sequelizeInstance,
    modelName: "assigned_exercises", // Use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);


module.exports = AssignedExercise;