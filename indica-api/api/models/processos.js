'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Processos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Origem da chave estrangeira das tabelas Indicacoes e Premiacoes
      Processos.hasMany(models.Indicacoes, {foreignKey: 'IdProcesso'});
      Processos.hasMany(models.Premiacoes, {foreignKey: 'IdProcesso'});
    }
  }
  Processos.init({
    Empresa: DataTypes.STRING(200),
    Vaga: DataTypes.STRING(200),
    MatriculaRH: DataTypes.STRING(50),
    Status: DataTypes.STRING(20),
    ValorPremiacao: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Processos',
  });
  return Processos;
};