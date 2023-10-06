const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Exercise extends Model {}
//Sequelize will create this table if it doesn't exist on startup

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true,
      },
   
  },

  {
    sequelize: sequelizeInstance,
    modelName: "exercises", //uselowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);


module.exports = Exercise;
