module.exports = (sequelize, DataTypes) => {
  const Village = sequelize.define('Village', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, notNull: true, isValidVillageName: validateVillageName }
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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

  Village.associate = (models) => {
    Village.hasMany(models.Character, { foreignKey: 'village_id', as: 'characters' });
  };

  return Village;
};
