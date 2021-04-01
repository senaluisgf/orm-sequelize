database = require('../models')

class NivelController {
    static async criarNivel(req, res){
        const novoNivel = req.body
        try{
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(201).json(novoNivelCriado)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodosOsNiveis(req, res) {
        try{
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmNivel(req, res){
        const { nivelId } = req.params
        try{
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(nivelId)
                }
            })
            return res.status(200).json(umNivel)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmNivel(req, res){
        const { nivelId } = req.params
        const novoNivel = req.body
        try{
            await database.Niveis.update(
                novoNivel,
                {
                    where: { id: Number(nivelId) }
                }
            )
            const nivelAlterado = await database.Niveis.findOne({ where: { id:Number(nivelId) }})
            return res.status(200).json(nivelAlterado)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmNivel(req, res){
        const { nivelId } = req.params
        try{
            await database.Niveis.destroy({ where: { id: Number(nivelId) } })
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController