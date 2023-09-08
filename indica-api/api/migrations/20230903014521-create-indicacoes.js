'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Indicacoes', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NomeIndicado: {
        type: Sequelize.STRING(200)
      },
      TelefoneIndicado: {
        type: Sequelize.STRING(14)
      },
      IdProcesso: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Processos', key: 'Id'}
      },
      MatriculaIndicante: {
        type: Sequelize.STRING(50)
      },
      Status: {
        type: Sequelize.STRING(20)
      },
      Linkedin: {
        type: Sequelize.STRING(200)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Indicacoes');
  }
};