module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    rank: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    power: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true, notNull: true } },
    profile_image: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    summary: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true, notNull: true } },
    father_id: { type: DataTypes.INTEGER, allowNull: true, validate: { isValidFather: validateFather } },
    mother_id: { type: DataTypes.INTEGER, allowNull: true, validate: { isValidMother: validateMother } },
    village_id: { type: DataTypes.INTEGER, allowNull: true, validate: { isValidVillage: validateVillage } },
  });

  Character.associate = (models) => {
    Character.belongsTo(models.Character, { as: 'father', foreignKey: 'father_id' });
    Character.belongsTo(models.Character, { as: 'mother', foreignKey: 'mother_id' });
    Character.belongsTo(models.Village, { as: 'village', foreignKey: 'village_id' });
    Character.hasMany(models.Jutsu, { foreignKey: 'character_id', as: 'jutsus' });
    Character.hasMany(models.CharacterImage, { foreignKey: 'character_id', as: 'images' });
  };

  async function validateVillage(value) {
    if (value) {
      const village = await sequelize.models.Village.findByPk(value);
      if (!village) {
        throw new Error('Village ID must refer to a valid Village.');
      }
    }
  }

  async function validateFather(value) {
    if (value) {
      const father = await sequelize.models.Character.findByPk(value);
      if (!father) {
        throw new Error('Father ID must refer to a valid Character.');
      }
    }
  }

  async function validateMother(value) {
    if (value) {
      const mother = await sequelize.models.Character.findByPk(value);
      if (!mother) {
        throw new Error('Mother ID must refer to a valid Character.');
      }
    }
  }

  return Character;
};
