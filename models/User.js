const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, notNull: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, notNull: true },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, notNull: true },
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

  User.prototype.generateTwoFactorCode = function () {
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    this.twoFactorCode = code.toString();
    this.twoFactorExpiresAt = expiresAt;
  };

  User.prototype.isTwoFactorCodeValid = function (code) {
    if (!this.twoFactorCode || new Date() > this.twoFactorExpiresAt) {
      return false;
    }
    return this.twoFactorCode === code;
  };

  return User;
};
