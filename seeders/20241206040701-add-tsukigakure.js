'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Villages', [
      {
        name: 'Tsukigakure (Vila Oculta da Lua)',
        symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442144/village-symbols/Kirigakure_Vila_Oculta_da_N%C3%A9voa_uyup1i.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Villages', {
      name: 'Tsukigakure (Vila Oculta da Lua)',
    });
  },
};

