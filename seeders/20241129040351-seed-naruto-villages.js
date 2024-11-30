'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Villages', [
      { name: 'Konohagakure (Vila Oculta da Folha)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sunagakure (Vila Oculta da Areia)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kirigakure (Vila Oculta da Névoa)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kumogakure (Vila Oculta das Nuvens)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Iwagakure (Vila Oculta da Pedra)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Amegakure (Vila Oculta da Chuva)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Otogakure (Vila Oculta do Som)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Takigakure (Vila Oculta da Cachoeira)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kusagakure (Vila Oculta da Grama)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yugakure (Vila Oculta das Fontes Termais)', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hoshigakure (Vila Oculta da Estrela)', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Villages', null, {});
  },
};

