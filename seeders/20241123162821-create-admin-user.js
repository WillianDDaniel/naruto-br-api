'use strict';

require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { USERNAME, USER_PASSWORD } = process.env;

    if (!USERNAME || !USER_PASSWORD) {
      console.error('Please define USERNAME and USER_PASSWORD in the .env file');
      return;
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(USER_PASSWORD, 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: USERNAME,
        password_hash: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
