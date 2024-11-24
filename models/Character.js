module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: { type: DataTypes.STRING, allowNull: false },
    father_id: { type: DataTypes.INTEGER, allowNull: true },
    mother_id: { type: DataTypes.INTEGER, allowNull: true },
    village: { type: DataTypes.STRING, allowNull: false },
    rank: { type: DataTypes.STRING, allowNull: false },
    power: { type: DataTypes.INTEGER, allowNull: false },
    profile_image: { type: DataTypes.STRING, allowNull: true },
    summary: { type: DataTypes.TEXT, allowNull: true },
  });

  Character.associate = (models) => {
    Character.belongsTo(models.Character, { as: 'father', foreignKey: 'father_id' });
    Character.belongsTo(models.Character, { as: 'mother', foreignKey: 'mother_id' });
    Character.hasMany(models.Jutsu, { foreignKey: 'character_id', as: 'jutsus' });
    Character.hasMany(models.CharacterImage, { foreignKey: 'character_id', as: 'images' });
  };

  return Character;
};
