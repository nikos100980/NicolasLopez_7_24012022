'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Message,{
        through: models.Like,
        foreignKey: 'idUSERS',
        otherKey: 'idMESSAGES',
      });

      models.Message.belongsToMany(models.User,{
        through: models.Like,
        foreignkey: 'idMESSAGES',
        otherKey: 'idUSERS',
      });

      models.Like.belongsTo(models.User,{
        foreignKey: 'idUSERS',
        as: 'user',
      });

      models.Like.belongsTo(models.Message,{
        foreignKey: 'idMESSAGES',
        as: 'message',
      });
    }
  }
  Like.init({
    idUSERS: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    idMESSAGES: {
      type: DataTypes.INTEGER,
      references : {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};