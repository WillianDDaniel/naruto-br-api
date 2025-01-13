'use strict';

require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { USERNAME, USER_PASSWORD, USER_EMAIL } = process.env;

    if (!USERNAME || !USER_PASSWORD || !USER_EMAIL) {
      console.error('Please define USERNAME, USER_PASSWORD and USER_EMAIL in the .env file');
      return;
    }

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(USER_PASSWORD, 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: USERNAME,
        password_hash: hashedPassword,
        email: USER_EMAIL,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
