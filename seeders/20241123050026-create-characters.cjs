'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Characters', [
      {
        name: 'Naruto Uzumaki',
        father_id: null,
        mother_id: null,
        village: 'Konohagakure',
        rank: 'Hokage',
        power: 9999,
        profile_image: 'https://example.com/naruto.jpg',
        summary: 'Naruto Uzumaki é o Sétimo Hokage de Konoha, conhecido por sua força e determinação.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Minato Namikaze',
        father_id: null,
        mother_id: null,
        village: 'Konohagakure',
        rank: 'Hokage',
        power: 9500,
        profile_image: 'https://example.com/minato.jpg',
        summary: 'Minato Namikaze, o Quarto Hokage, foi um ninja lendário conhecido como Relâmpago Amarelo de Konoha.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kushina Uzumaki',
        father_id: null,
        mother_id: null,
        village: 'Konohagakure',
        rank: 'Jinchuuriki',
        power: 8500,
        profile_image: 'https://example.com/kushina.jpg',
        summary: 'Kushina Uzumaki era a mãe de Naruto e a anterior portadora da Kyuubi.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  },
};
