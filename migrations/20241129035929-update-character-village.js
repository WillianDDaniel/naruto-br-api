'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'village_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Villages', // Nome da tabela
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.removeColumn('Characters', 'village'); // Remove o campo antigo
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'village', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('Characters', 'village_id');
  },
};

