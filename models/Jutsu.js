module.exports = (sequelize, DataTypes) => {
  const Jutsu = sequelize.define('Jutsu', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Jutsu.associate = (models) => {
    Jutsu.belongsTo(models.Character, {
      foreignKey: 'character_id',
      as: 'character',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Jutsu;
};
