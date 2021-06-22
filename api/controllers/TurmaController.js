const { TurmasService } = require('../services')
const turmasService = new TurmasService()

class TurmaController{
    static async criarUmaTurma(req, res){
        const novaTurma = req.body
        try{
            const novaTurmaCriada = await turmasService.criaUmRegistro(novaTurma)
            return res.status(201).json(novaTurmaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodasAsTurmas(req, res){
        try{
            const todasAsTurmas = await turmasService.pegaTodosRegistros(req.query)
            return res.status(200).json(todasAsTurmas)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            const umaTurma = await turmasService.pegaUmRegistro(turmaId)
            return res.status(200).json(umaTurma)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaTurma(req, res){
        const { turmaId } = req.params
        const novaTurma = req.body
        try{
            const novaTurmaAlterada = await turmasService.alteraUmRegistro(turmaId, novaTurma)
            return res.status(200).json(novaTurmaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            await turmasService.deletaUmRegistro(turmaId)
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaTurma(req, res){
        const { turmaId } = req.params
        try{
            await turmasService.restauraTurma(turmaId)
            return res
                .status(200)
                .json({message: `turma ${turmaId} foi restaurada`})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = TurmaController