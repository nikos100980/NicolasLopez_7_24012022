'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    
  //   Helper method for defining associations.
  //     This method is not a part of Sequelize lifecycle.
  //     The `models/index` file will call this method automatically.
     
     static associate(models) {
  
      models.User.hasMany(models.Message,
        {onDelete: 'cascade'});

      models.User.hasMany(models.Comment,{
        onDelete: 'cascade'
      })
        
      
    }
    
  };
  User.init({
    email: DataTypes.STRING,
    picture: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};