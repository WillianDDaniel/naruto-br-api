'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {

    static associate(models) {
      Village.hasMany(models.Character, { foreignKey: 'village_id', as: 'characters' });
    }
  }
  Village.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Village',
  });

  return Village;
};