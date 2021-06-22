const database = require('../models')
const Services = require('./Services')

class PessoasService extends Services{
    constructor(){
        super('Pessoas')
    }

    async pegaPessoasInativas(){
        return await database[this.nomeDoModelo]
            .scope('inativos')
            .findAll()
    }

    async pegaPessoasAtivas(){
        return await database[this.nomeDoModelo]
            .scope('ativos')
            .findAll()
    }

    async restauraPessoa(pessoaId){
        return await database[this.nomeDoModelo].restore({
            where: {
                id: Number(pessoaId)
            }
        })
    }
}

module.exports = PessoasService