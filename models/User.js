const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    twoFactorCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twoFactorExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
