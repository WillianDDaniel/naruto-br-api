module.exports = (sequelize, DataTypes) => {
  const JutsuCharacter = sequelize.define('JutsuCharacter', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    jutsu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  JutsuCharacter.associate = (models) => {
    JutsuCharacter.belongsTo(models.Jutsu, {
      foreignKey: 'jutsu_id',
      as: 'jutsu',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    JutsuCharacter.belongsTo(models.Character, {
      foreignKey: 'character_id',
      as: 'character',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return JutsuCharacter;
};

