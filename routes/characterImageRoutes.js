const express = require('express');
const characterImageRoutes = express.Router();
const characterImageController = require('../controllers/characterImageController.js');
const authenticate = require('../middlewares/auth.js');

characterImageRoutes.get('/:id', characterImageController.getCharacterImageById);
characterImageRoutes.post('/', authenticate, characterImageController.createCharacterImage);
characterImageRoutes.put('/:id', authenticate, characterImageController.updateCharacterImage);
characterImageRoutes.delete('/:id', authenticate, characterImageController.deleteCharacterImage);

module.exports = characterImageRoutes;
