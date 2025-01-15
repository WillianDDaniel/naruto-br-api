const express = require('express');
const jutsuRoutes = express.Router();
const jutsuController = require('../controllers/jutsuController.js');
const authenticate = require('../middlewares/auth.js');

jutsuRoutes.get('/', jutsuController.getAllJutsus);
jutsuRoutes.get('/:id', jutsuController.getJutsuById);
jutsuRoutes.post('/', authenticate, jutsuController.createJutsu);
jutsuRoutes.put('/:id', authenticate, jutsuController.updateJutsu);
jutsuRoutes.delete('/:id', authenticate, jutsuController.deleteJutsu);

module.exports = jutsuRoutes;
