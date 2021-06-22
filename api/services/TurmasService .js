const database = require('../models')
const Sequelize = require('sequelize')
const Op =  Sequelize.Op
const Services = require('./Services')

class TurmasService extends Services{
    constructor(){
        super('Turmas')
    }

    async pegaTodosRegistros({data_inicial, data_final} = {}){
        const where = {}
        data_inicial || data_final? where.data_inicio = {} : null
        data_inicial? where.data_inicio[Op.gte] = data_inicial : null
        data_final? where.data_inicio[Op.lte] = data_final : null

        return await database[this.nomeDoModelo].findAll({where: {...where}})
    }

    async restauraTurma(turmaId){
        return await database[this.nomeDoModelo].restore({
            where: {
                id: Number(turmaId)
            }
        })
    }
}

module.exports = TurmasService