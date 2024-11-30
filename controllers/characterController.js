const { Character, Jutsu, CharacterImage, Village } = require('../models');

module.exports = {
  async getAllCharacters(req, res) {
    try {
      const characters = await Character.findAll({
        include: [
          { model: Village, as: 'village', attributes: ['id', 'name'] },
          { model: Character, as: 'father', attributes: ['id', 'name']},
          { model: Character, as: 'mother', attributes: ['id', 'name']},
          { model: Jutsu, as: 'jutsus', attributes: { exclude: ['createdAt', 'updatedAt'] }},
          { model: CharacterImage, as: 'images', attributes: ['image_url', 'image_type', 'character_id', 'id']},
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'father_id', 'mother_id', 'village_id'] },
      });

      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch characters' });
    }
  },

  async getCharacterById(req, res) {
    try {
      const character = await Character.findByPk(req.params.id, {
        include: [
          { model: Village, as: 'village', attributes: ['id', 'name'] },
          { model: Character, as: 'father', attributes: ['id', 'name']},
          { model: Character, as: 'mother', attributes: ['id', 'name']},
          { model: Jutsu, as: 'jutsus', attributes: { exclude: ['createdAt', 'updatedAt'] }},
          { model: CharacterImage, as: 'images', attributes: ['image_url', 'image_type', 'character_id', 'id']},
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'father_id', 'mother_id', 'village_id'] },
      });

      if (!character) return res.status(404).json({ error: 'Character not found' });
      res.status(200).json(character);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch character' });
    }
  },

  async createCharacter(req, res) {
    try {
      const newCharacter = await Character.create(req.body);
      res.status(201).json(newCharacter);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create character' });
    }
  },

  async updateCharacter(req, res) {
    try {
      const updated = await Character.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) return res.status(404).json({ error: 'Character not found' });
      res.status(200).json({ message: 'Character updated successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update character' });
    }
  },

  async deleteCharacter(req, res) {
    try {
      const deleted = await Character.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Character not found' });
      res.status(200).json({ message: 'Character deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete character' });
    }
  }
};
