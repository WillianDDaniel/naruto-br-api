module.exports = (sequelize, DataTypes) => {
  const Village = sequelize.define('Village', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true,
      validate: { notEmpty: true, notNull: true, isValidVillageName: validateVillageName }
    },
  });

  async function validateVillageName(value) {
    if (value) {
      const village = await sequelize.models.Village.findOne({ where: { name: value } });
      if (village) {
        throw new Error('Village name must be unique.');
      }
    }
  }

  return Village;
};