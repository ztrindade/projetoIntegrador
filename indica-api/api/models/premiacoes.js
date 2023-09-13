'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Premiacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Recebe chave estrangeira das tabelas Processos e Indicacoes
      Premiacoes.belongsTo(models.Processos, {foreignKey: 'IdProcesso'});
      Premiacoes.belongsTo(models.Indicacoes, {foreignKey: 'IdIndicacao'});
    }
  }
  Premiacoes.init({
    ValorPremiacao: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Premiacoes',
  });
  return Premiacoes;
};