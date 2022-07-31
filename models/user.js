'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.roles, {

        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"

      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
    },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    dob: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    bloodgroup: DataTypes.STRING,
    age: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });


  return User;
};