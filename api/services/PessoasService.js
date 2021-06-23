const database = require('../models')
const Sequelize = require('sequelize')
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

    async pegaMatriculasCanceladas(pessoaId){
        const pessoa = await super.pegaUmRegistro(pessoaId)
        if(pessoa){
            const matriculas = await pessoa.getMatriculasCanceladas()
            return matriculas
        } else {
            throw new Error('Usuario nao cadastrado')
        }
    }

    async pegaMatriculasPorTurma(turmaId){
        return await database.Matriculas.findAndCountAll({
            where: {
                turma_id: Number(turmaId),
                status: 'Confirmado'
            },
            limite: 20,
            order: [['estudante_id', 'ASC']]
        })
    }

    async pegaTurmasLotadas(lotacao){
        return await database.Matriculas.findAndCountAll({
            where: {status: "Confirmado"},
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
        })
    }
}

module.exports = PessoasService