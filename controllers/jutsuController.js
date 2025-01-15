const { Jutsu } = require('../models');

module.exports = {
  async createJutsu(req, res) {
    try {
      const newJutsu = await Jutsu.create(req.body);
      res.status(201).json(newJutsu);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create jutsu' });
    }
  },

  async getJutsuById(req, res) {
    try {
      const jutsu = await Jutsu.findByPk(req.params.id);
      if (!jutsu) return res.status(404).json({ error: 'Jutsu not found' });
      res.status(200).json(jutsu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jutsu' });
    }
  },

  async getAllJutsus(req, res) {
    try {
      const jutsus = await Jutsu.findAll();
      res.status(200).json(jutsus);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jutsus' });
    }
  },

  async updateJutsu(req, res) {
    try {
      const updated = await Jutsu.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) return res.status(404).json({ error: 'Jutsu not found' });
      res.status(200).json({ message: 'Jutsu updated successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update jutsu' });
    }
  },

  async deleteJutsu(req, res) {
    try {
      const deleted = await Jutsu.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Jutsu not found' });
      res.status(200).json({ message: 'Jutsu deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete jutsu' });
    }
  },
};
