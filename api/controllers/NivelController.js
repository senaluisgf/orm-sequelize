const { NiveisService } = require('../services')
const niveisService = new NiveisService()

class NivelController {
    static async criarNivel(req, res){
        const novoNivel = req.body
        try{
            const novoNivelCriado = await niveisService.criaUmRegistro(novoNivel)
            return res.status(201).json(novoNivelCriado)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodosOsNiveis(req, res) {
        try{
            const todosOsNiveis = await niveisService.pegaTodosRegistros()
            return res.status(200).json(todosOsNiveis)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmNivel(req, res){
        const { nivelId } = req.params
        try{
            const umNivel = await niveisService.pegaUmRegistro(nivelId)
            return res.status(200).json(umNivel)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmNivel(req, res){
        const { nivelId } = req.params
        const novoNivel = req.body
        try{
            const nivelAlterado = await niveisService.alteraUmRegistro(nivelId,novoNivel)
            return res.status(200).json(nivelAlterado)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmNivel(req, res){
        const { nivelId } = req.params
        try{
            await niveisService.deletaUmRegistro(nivelId)
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmNivel(req, res){
        const { nivelId } = req.params
        try{
            await niveisService.restauraNivel(nivelId)
            return res
                .status(200)
                .json({message: `nivel ${nivelId} foi restaurado`})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = NivelController