module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: { type: DataTypes.STRING, allowNull: false, validate : { notEmpty: true, notNull: true } },
    father_id: { type: DataTypes.INTEGER, allowNull: true },
    mother_id: { type: DataTypes.INTEGER, allowNull: true },
    village: { type: DataTypes.STRING, allowNull: false, validate : { notEmpty: true, notNull: true } },
    rank: { type: DataTypes.STRING, allowNull: false, validate : { notEmpty: true, notNull: true } },
    power: { type: DataTypes.INTEGER, allowNull: false, validate : { notEmpty: true, notNull: true } },
    profile_image: { type: DataTypes.STRING, allowNull: false, validate : { notEmpty: true, notNull: true } },
    summary: { type: DataTypes.TEXT, allowNull: false, validate : { notEmpty: true, notNull: true } },
  });

  Character.associate = (models) => {
    Character.belongsTo(models.Character, { as: 'father', foreignKey: 'father_id' });
    Character.belongsTo(models.Character, { as: 'mother', foreignKey: 'mother_id' });
    Character.hasMany(models.Jutsu, { foreignKey: 'character_id', as: 'jutsus' });
    Character.hasMany(models.CharacterImage, { foreignKey: 'character_id', as: 'images' });
  };

  return Character;
};
