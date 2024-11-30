const express = require('express');
const villageRoutes = express.Router();
const villageController = require('../controllers/villageController.js');

villageRoutes.get('/', villageController.getAllVillages);

module.exports = villageRoutes;