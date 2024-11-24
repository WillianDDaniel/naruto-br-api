const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController.js');
const authenticate = require('../middlewares/auth.js');

authRoutes.get('/', authenticate, authController.checkAuth);
authRoutes.post('/', authController.login);

module.exports = authRoutes;