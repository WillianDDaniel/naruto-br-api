const { Village } = require('../models');

module.exports = {
  async getAllVillages(req, res) {
    try {
      const villages = await Village.findAll({
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
};
