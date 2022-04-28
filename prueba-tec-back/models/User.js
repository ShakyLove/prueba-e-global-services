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
      User.belongsTo(models.IdentificationType, {
        foreignKey: 'id',
        target_key: 'identification_type_id'
      })
      
      User.belongsTo(models.City, {
        foreignKey: 'id',
        target_key: 'city_id'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    identification: DataTypes.STRING,
    identification_type_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    birth: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};