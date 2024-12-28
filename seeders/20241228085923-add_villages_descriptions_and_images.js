'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const villages = [
      {
        id: 1,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Konohagakure.webp?updatedAt=1735378345397',
        description: 'Konohagakure, ou Vila Oculta da Folha, é conhecida por seus poderosos shinobi e líderes lendários como o Hokage. Situada em uma área montanhosa e cercada por florestas, é o lar de grandes clãs como os Uchiha e Hyuga.'
      },
      {
        id: 2,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Sunagakure.webp?updatedAt=1735378344011',
        description: 'Sunagakure, ou Vila Oculta da Areia, está localizada em um vasto deserto. É conhecida por seus ninjas especializados no uso de areia e por ser a casa do jinchūriki de Shukaku, o Kazekage Gaara.'
      },
      {
        id: 3,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Kirigakure.webp?updatedAt=1735378344900',
        description: 'Kirigakure, ou Vila Oculta da Névoa, é uma vila rodeada por neblina densa. Famosa por seus espadachins lendários e seu passado sombrio, é associada à brutalidade e eficiência de seus shinobi.'
      },
      {
        id: 4,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Kumogakure.webp?updatedAt=1735378344077',
        description: 'Kumogakure, ou Vila Oculta das Nuvens, está situada em montanhas altas e cercada por nuvens. É conhecida por sua força militar e usuários poderosos de técnicas de relâmpago.'
      },
      {
        id: 5,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Iwagakure.webp?updatedAt=1735378344330',
        description: 'Iwagakure, ou Vila Oculta da Pedra, é famosa por seus ninjas que utilizam técnicas baseadas em terra e por sua forte posição militar.'
      },
      {
        id: 6,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Amegakure.webp?updatedAt=1735378344205',
        description: 'Amegakure, ou Vila Oculta da Chuva, é uma vila marcada pela chuva constante. Foi o centro de muitos conflitos, moldando seus ninjas em sobreviventes engenhosos e implacáveis.'
      },
      {
        id: 7,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Otogakure.webp?updatedAt=1735378344142',
        description: 'Otogakure, ou Vila Oculta do Som, foi criada por Orochimaru como uma base para suas experimentações. Seus ninjas são conhecidos por usarem técnicas sonoras e experimentais.'
      },
      {
        id: 8,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Takigakure.webp?updatedAt=1735378344260',
        description: 'Takigakure, ou Vila Oculta da Cachoeira, é uma vila isolada e rodeada por uma grande cachoeira. É conhecida por seu jinchūriki de sete caudas, Chōmei.'
      },
      {
        id: 9,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Kusagakure.webp?updatedAt=1735378344319',
        description: 'Kusagakure, ou Vila Oculta da Grama, está situada em campos vastos e é conhecida por seus ninjas com habilidades relacionadas à natureza.'
      },
      {
        id: 10,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Yugakure.webp?updatedAt=1735378343904',
        description: 'Yugakure, ou Vila Oculta das Fontes Termais, é famosa por suas fontes termais e pela transição de ser uma vila militar para um lugar pacífico.'
      },
      {
        id: 11,
        image_url: 'https://ik.imagekit.io/1zqqcceojt/villages/Hoshigakure.webp?updatedAt=1735378344110',
        description: 'Hoshigakure, ou Vila Oculta da Estrela, é uma vila menor que utiliza o poder de um meteorito misterioso para treinar seus ninjas.'
      }
    ];

    for (const village of villages) {
      await queryInterface.bulkUpdate(
        'Villages',
        { image_url: village.image_url, description: village.description },
        { id: village.id }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let id = 1; id <= 11; id++) {
      await queryInterface.bulkUpdate(
        'Villages',
        { image_url: null, description: null },
        { id }
      );
    }
  }
};
