const database = require('../models')
const Services = require('./Services')

class PessoasService extends Services{
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
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

    //Metodos referentes a tabela de matrículas
    async pegaMatriculas(where={}){
        return await database.Matriculas.findAll({where:{...where}})
    }


    async pegaUmaMatricula(where={}){
        return await database.Matriculas.findOne({where:{...where}})
    }

    async alteraUmaMatricula(novaMatricula, where={}){
        await database.Matriculas.update(novaMatricula, {where:{...where}})
        return this.pegaUmaMatricula({...where})
    }

    async deletaUmaMatricula(where={}){
        return await database.Matriculas.destroy({where:{...where}})
    }

    async restauraMatricula(where={}){
        return database.Matriculas.restore({where:{...where}})
    }
}

module.exports = PessoasService