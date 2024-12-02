'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('JutsuCharacter', 'JutsuCharacters');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('JutsuCharacters', 'JutsuCharacter');
  }
};
