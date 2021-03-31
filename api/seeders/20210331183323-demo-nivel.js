'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Niveis', [
      {
        descr_nivel: 'Básico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descr_nivel: 'Intermediário',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descr_nivel: 'Avançado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Niveis', null, {});
  }
};
