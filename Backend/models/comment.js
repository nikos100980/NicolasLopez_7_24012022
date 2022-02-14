'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      models.Comment.belongsTo(models.User,{
        
        foreignKey: {
          allowNull: false,
             
        }, onDelete:'CASCADE',
      });
      models.Comment.belongsTo(models.Message,{
        
        foreignKey: {
          allowNull: false,
             
        }, onDelete:'CASCADE',
      });
    }
  }
  Comment.init({
    MessageId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Message',
        key: 'id',
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'User',
        key: 'id',
      }
    },
    comments: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};