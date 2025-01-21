const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendTwoFactorEmail = require('../mailer/twoFactorMailer.js');
require('dotenv').config();

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(404).json({ error: 'User not found' });

      const isValid = await user.validatePassword(password);

      if (!isValid) return res.status(401).json({ error: 'Invalid password' });

      user.generateTwoFactorCode();
      await user.save();

      await sendTwoFactorEmail(user.email, user.twoFactorCode);
      res.status(200).json({ message: 'Verify 2FA code' });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  },

  async verify2FA(req, res) {
    const { username, code } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(404).json({ error: 'User not found' });

      if (!user.isTwoFactorCodeValid(code)) {
        return res.status(401).json({ error: 'Invalid or expired 2FA code' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 7,
      });

      await user.update({
        twoFactorCode: null,
        twoFactorExpiresAt: null,
      });

      res.status(200).json({ message: '2FA verified successfully' });
    } catch (error) {
      console.error('Erro na verificação do 2FA:', error);
      res.status(500).json({ error: 'Failed to verify 2FA' });
    }
  },

  async checkAuth(req, res) {
    res.status(200).json({ message: 'Authenticated' });
  },

  async logout(req, res) {
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'Logout successful' });
  },
};
