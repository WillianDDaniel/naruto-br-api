module.exports = (sequelize, DataTypes) => {
  const Jutsu = sequelize.define('Jutsu', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    type: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    power: { type: DataTypes.INTEGER, allowNull: false, validate: { notEmpty: true, notNull: true } },
    description: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true, notNull: true } },
    character_id: { type: DataTypes.INTEGER, allowNull: false,
      validate: { notEmpty: true, notNull: true, isValidCharacter: validateCharacter
    }},
  });

  Jutsu.associate = (models) => {
    Jutsu.belongsTo(models.Character, {
      foreignKey: 'character_id',
      as: 'character',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  async function validateCharacter(value) {
    if (value) {
      const character = await sequelize.models.Character.findByPk(value);
      if (!character) {
        throw new Error('Character ID must refer to a valid Character.');
      }
    }
  }

  return Jutsu;
};
