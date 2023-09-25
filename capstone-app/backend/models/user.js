const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class User extends Model {}
//Sequelize will create this table if it doesn't exist on startup

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      defaultValue: 'student'
    },
  },

  {
    sequelize: sequelizeInstance,
    modelName: "users", //uselowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = User;
