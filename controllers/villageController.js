const { Village, Character, CharacterImage } = require('../models');

module.exports = {
  async getAllVillages(req, res) {
    try {
      const villages = await Village.findAll({
        include: [
          { model: Character, as: 'characters', attributes: ['id', 'name'] },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });

      if (villages && villages.length > 0) {
        res.status(200).json(villages);
      } else {
        res.status(404).json({ error: "Nenhuma vila encontrada." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getVillageById(req, res) {
    try {
      const village = await Village.findByPk(req.params.id, {
        include: [
          { model: Character, as: 'characters',
              include: [{
                model: CharacterImage, as: 'images', attributes: { exclude: ['createdAt', 'updatedAt', 'character_id'] }
              }], attributes: { exclude: ['createdAt', 'updatedAt', 'village_id'] }
          }],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      if (!village) return res.status(404).json({ error: 'Vila não encontrada' });
      res.status(200).json(village);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
