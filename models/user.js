'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    islogged: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate:(user)=>{
        const salt=bcrypt.genSaltSync(10);
        user.password=bcrypt.hashSync(String(user.password),salt);
      }
    }
  });
  return User;
};