'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Indicacoes', [{
      IdProcesso: 1,
      NomeIndicado: "Joao de Joana",
      TelefoneIndicado: "61987654321",
      MatriculaIndicante: "Bruna",
      Status: "Em análise",
      Linkedin: "",     
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Indicacoes', null, {});
  }
};
