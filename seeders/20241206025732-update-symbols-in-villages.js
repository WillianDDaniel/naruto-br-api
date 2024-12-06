'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const updates = [
      { id: 1, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442138/village-symbols/Konohagakure_Vila_Oculta_da_Folha_imnztn.png' },
      { id: 2, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442140/village-symbols/Sunagakure_Vila_Oculta_da_Areia_gfuxl8.png' },
      { id: 3, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442144/village-symbols/Kirigakure_Vila_Oculta_da_N%C3%A9voa_uyup1i.png' },
      { id: 4, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442141/village-symbols/Kumogakure_Vila_Oculta_das_Nuvens_gmyor9.png' },
      { id: 5, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442142/village-symbols/Iwagakure_Vila_Oculta_da_Pedra_oopozj.png' },
      { id: 6, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442141/village-symbols/Amegakure_Vila_Oculta_da_Chuva_tnuqdo.png' },
      { id: 7, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442141/village-symbols/Otogakure_Vila_Oculta_do_Som_m85bjx.png' },
      { id: 8, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442139/village-symbols/Takigakure_Vila_Oculta_da_Cachoeira_ibzju7.png' },
      { id: 9, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442142/village-symbols/Kusagakure_Vila_Oculta_da_Grama_q9mwmp.png' },
      { id: 10, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442138/village-symbols/Yugakure_Vila_Oculta_das_Fontes_Termais_boupjq.png' },
      { id: 11, symbol: 'https://res.cloudinary.com/dmnz1wgfw/image/upload/v1733442141/village-symbols/Hoshigakure_Vila_Oculta_da_Estrela_fx6mxn.png' },
    ];

    for (const update of updates) {
      await queryInterface.bulkUpdate(
        'Villages',
        { symbol: update.symbol },
        { id: update.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate(
      'Villages',
      { symbol: null },
      { id: { [Sequelize.Op.between]: [1, 11] } }
    );
  },
};
