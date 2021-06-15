const database = require('../models')
const Sequelize = require('sequelize')
const Op =  Sequelize.Op

class TurmaController{
    static async criarUmaTurma(req, res){
        const novaTurma = req.body
        try{
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(201).json(novaTurmaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodasAsTurmas(req, res){
        const { data_inicial, data_final } = req.query
        const where = {}
        data_inicial || data_final? where.data_inicio = {} : null
        data_inicial? where.data_inicio[Op.gte] = data_inicial : null
        data_final? where.data_inicio[Op.lte] = data_final : null
        try{
            const todasAsTurmas = await database.Turmas.findAll({where})
            return res.status(200).json(todasAsTurmas)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            const umaTurma = await database.Turmas.findOne({ where: { id: Number(turmaId) } })
            return res.status(200).json(umaTurma)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaTurma(req, res){
        const { turmaId } = req.params
        const novaTurma = req.body
        try{
            await database.Turmas.update(novaTurma, { where: { id: Number(turmaId) } })
            const novaTurmaAlterada = await database.Turmas.findOne({where: { id: Number(turmaId) } })
            return res.status(200).json(novaTurmaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            await database.Turmas.destroy({ where: { id: Number(turmaId) } })
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            await database.Turmas.restore({
                where: {
                    id: Number(turmaId)
                }
            })
            return res
                .status(200)
                .json({message: `turma ${turmaId} foi restaurada`})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = TurmaController