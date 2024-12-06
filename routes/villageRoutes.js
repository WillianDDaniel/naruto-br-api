const express = require('express');
const villageRoutes = express.Router();
const villageController = require('../controllers/villageController.js');

villageRoutes.get('/', villageController.getAllVillages);
villageRoutes.get('/:id', villageController.getVillageById);

module.exports = villageRoutes;