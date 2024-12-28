'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Villages', 'image_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Villages', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Villages', 'image_url');
    await queryInterface.removeColumn('Villages', 'description');
  },
};
