'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IdentificationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IdentificationType.hasMany(models.User, {
        foreignKey: 'identification_type_id'
      })
    }
  }
  IdentificationType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IdentificationType',
  });
  return IdentificationType;
};