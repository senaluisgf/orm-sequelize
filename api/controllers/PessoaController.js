const database = require('../models')

class PessoaController {
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
        const umaPessoa = await database.Pessoas.findOne({
            where: {
                id: Number(pessoaId)
            }
        })
        return res.status(200).json(umaPessoa)
    }
}

module.exports = PessoaController