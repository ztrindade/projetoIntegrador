'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Indicacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Origem da chave estrangeira da tabela Premiacoes
      Indicacoes.hasMany(models.Premiacoes, {foreignKey: 'IdIndicacao'});
      // Recebe chave estrangeira da tabela Processos
      Indicacoes.belongsTo(models.Processos, {foreignKey: 'IdProcesso'});
    }
  }
  Indicacoes.init({
    NomeIndicado: DataTypes.STRING,
    TelefoneIndicado: DataTypes.STRING,
    MatriculaIndicante: DataTypes.STRING,
    Status: DataTypes.STRING,
    Linkedin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Indicacoes',
  });
  return Indicacoes;
};