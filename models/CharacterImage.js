module.exports = (sequelize, DataTypes) => {
  const CharacterImage = sequelize.define('CharacterImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_type: {
      type: DataTypes.ENUM('jpg', 'png'),
      allowNull: false,
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CharacterImage.associate = (models) => {
    CharacterImage.belongsTo(models.Character, {
      foreignKey: 'character_id',
      as: 'character',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return CharacterImage;
};
