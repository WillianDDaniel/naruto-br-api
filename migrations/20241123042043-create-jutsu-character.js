'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JutsuCharacter', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      jutsu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Jutsus', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      character_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Characters', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JutsuCharacter');
  },
};
