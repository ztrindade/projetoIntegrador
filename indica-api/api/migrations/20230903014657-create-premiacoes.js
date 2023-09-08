'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Premiacoes', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdProcesso: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Processos', key: 'Id'}
      },
      IdIndicacao: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Indicacoes', key: 'Id'}
      },
      ValorPremiacao: {
        type: Sequelize.DECIMAL(10,2)
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
    await queryInterface.dropTable('Premiacoes');
  }
};