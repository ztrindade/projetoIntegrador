'use strict';

const { NOW } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Processos', [{
      Empresa: 'Empresa exemplo',
      Vaga: 'Dev Backend',
      MatriculaRH: 'danilo',
      Status: 'Em andamento',
      ValorPremiacao: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Processos', null, {});
  }
};
