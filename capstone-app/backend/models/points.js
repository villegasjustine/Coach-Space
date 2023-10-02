const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user")

class Points extends Model {}

Points.init(
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
    assignedDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },

    points: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    
    },
  
  },
  {
    sequelize: sequelizeInstance,
    modelName: "points", // Use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);


module.exports = Points;