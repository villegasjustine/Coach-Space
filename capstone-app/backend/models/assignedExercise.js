const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user")
const Exercise = require("./exercise")
class AssignedExercise extends Model {}

AssignedExercise.init(
  {
    // Define a custom field for the ID
    customId: {
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
  },
  {
    sequelize: sequelizeInstance,
    modelName: "assigned_exercises", // Use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);


AssignedExercise.addHook("beforeValidate", (assignedExercise) => {
  if (!assignedExercise.customId) {
    assignedExercise.customId = 1; // Set the initial value to 1
  }
});

AssignedExercise.prototype.getAeId = function () {
  return `AE${this.customId}`;
};

module.exports = AssignedExercise;