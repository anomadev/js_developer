'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', [
      { id: 1, description: 'Backend Autenticacion', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, description: 'Backend Relaciones DB', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, description: 'Backend Websockets RT', createdAt: new Date, updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
