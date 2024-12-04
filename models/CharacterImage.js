module.exports = (sequelize, DataTypes) => {
  const CharacterImage = sequelize.define('CharacterImage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false, },
    image_url: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, notNull: true } },
    image_type: { type: DataTypes.ENUM('jpg', 'png'), allowNull: false, validate: { isValidType: validateImgType } },
    character_id: { type: DataTypes.INTEGER, allowNull: false, validate: { isvalidCharacter: validateCharacter } },
  });

  CharacterImage.associate = (models) => {
    CharacterImage.belongsTo(models.Character, {
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

  async function validateImgType(value) {
    const allowedTypes = ['jpg', 'png'];
    if (!allowedTypes.includes(value)) {
      throw new Error('image_type must be one of: jpg, png');
    }
  }

  return CharacterImage;
};
