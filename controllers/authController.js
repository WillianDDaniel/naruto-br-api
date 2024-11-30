const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(404).json({ error: 'User not found' });

      const isValid = await user.validatePassword(password);

      if (!isValid) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Failed to login' });
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
