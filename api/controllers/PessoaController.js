const database = require('../models')

class PessoaController {

    static async criarPessoa(req, res){
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res
                .status(200)
                .json(todasAsPessoas);
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaPessoa(req, res){
        const { pessoaId } = req.params

        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaPessoa(req, res){
        const { pessoaId } = req.params;
        const alteracoes = req.body
        try{
            await database.Pessoas.update(
                alteracoes,
                {
                    where: {
                        id: Number(pessoaId)
                    }
                }
            )
            const pessoaAlterada = await database.Pessoas.findOne({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(200).json(pessoaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await database.Pessoas.destroy({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(204).json()
        } catch( error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController