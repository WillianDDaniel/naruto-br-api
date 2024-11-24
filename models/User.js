const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.setPassword = async function (password) {
    this.password_hash = await bcrypt.hash(password, 10);
  };

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
