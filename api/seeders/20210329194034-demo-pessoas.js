'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Luis Guilherme',
        ativo: 1,
        email: 'sena.luisgf@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hélio Endrio',
        ativo: 1,
        email: 'herc@icomp.ufam.edu.br',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Altigran Silva',
        ativo: 1,
        email: 'altigran@icomp.ufam.edu.br',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
