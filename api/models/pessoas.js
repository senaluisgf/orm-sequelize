'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' })
      Pessoas.hasMany(
        models.Matriculas,
        { 
          foreignKey: 'estudante_id',
          scope:{status: 'Cancelado'},
          as: 'MatriculasCanceladas'
        }
      )
    }
  };
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        validaNome: function (nome) {
          if(nome.length < 3) throw new Error('o Nome deve conter no mínimo 3 letras')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'insira um tipo de email válido' }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {}
    },
    scopes: {
      ativos: { where: {ativo: true } },
      inativos: { where: { ativo: false } }
    }
  });
  return Pessoas;
};