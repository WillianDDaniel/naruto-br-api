const express = require('express');
const characterRoutes = express.Router();
const characterController = require('../controllers/characterController.js');
const authenticate = require('../middlewares/auth.js');

characterRoutes.get('/', characterController.getAllCharacters);
characterRoutes.get('/:id', characterController.getCharacterById);
characterRoutes.post('/', authenticate, characterController.createCharacter);
characterRoutes.put('/:id', authenticate, characterController.updateCharacter);
characterRoutes.delete('/:id', authenticate, characterController.deleteCharacter);

module.exports = characterRoutes;
