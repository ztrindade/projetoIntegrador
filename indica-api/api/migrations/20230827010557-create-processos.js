'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Processos', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Empresa: {
        type: Sequelize.STRING(200)
      },
      Vaga: {
        type: Sequelize.STRING(200)
      },
      MatriculaRH: {
        type: Sequelize.STRING(50)
      },
      Status: {
        type: Sequelize.STRING(20)
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
    await queryInterface.dropTable('Processos');
  }
};