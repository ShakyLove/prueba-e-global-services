'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('IdentificationTypes', [
      {
        name: 'Tarjeta de identidad',
      },
      {
        name: 'Cédula',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('IdentificationTypes', null, {});
  }
};
