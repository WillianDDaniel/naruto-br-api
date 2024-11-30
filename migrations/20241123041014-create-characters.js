'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      father_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Characters', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      mother_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Characters', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      village: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rank: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      power: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('Characters');
  },
};
