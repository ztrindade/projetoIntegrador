'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Premiacoes', [{
      IdProcesso: 1,
      IdIndicacao: 1,
      ValorPremiacao: 2000, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Premiacoes', null, {});
  }
};
