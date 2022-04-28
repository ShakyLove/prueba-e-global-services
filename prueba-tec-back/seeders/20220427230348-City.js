'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cities', [
      {
        name: 'Bogotá',
      },
      {
        name: 'Medellin',
      },
      {
        name: 'Barranquilla',
      },
      {
        name: 'Cali',
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
