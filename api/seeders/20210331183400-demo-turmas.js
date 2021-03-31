'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Turmas', [
      {
        docente_id: 3,
        data_inicio: '2021-04-01',
        nivel_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        docente_id: 4,
        data_inicio: '2021-04-01',
        nivel_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        docente_id: 4,
        data_inicio: '2021-04-01',
        nivel_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Turmas', null, {});
  }
};
