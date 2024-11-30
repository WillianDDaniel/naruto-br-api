const { CharacterImage, Character } = require('../models');

module.exports = {
  async getCharacterImageById(req, res) {
    try {
      const image = await CharacterImage.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      if (!image) {
        return res.status(404).json({ error: 'Character image not found' });
      }
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch character image' });
    }
  },

  async createCharacterImage(req, res) {
    try {
      const newImage = await CharacterImage.create(req.body);
      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create character image' });
    }
  },

  async updateCharacterImage(req, res) {
    try {
      const updated = await CharacterImage.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated[0]) return res.status(404).json({ error: 'Character image not found' });
      res.status(200).json({ message: 'Character image updated successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update character image' });
    }
  },

  async deleteCharacterImage(req, res) {
    try {
      console.log(req.params.id);
      const deleted = await CharacterImage.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Character image not found' });
      res.status(200).json({ message: 'Character image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete character image' });
    }
  },
};
