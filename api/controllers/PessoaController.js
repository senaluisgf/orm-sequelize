const database = require('../models')

class PessoaController {
    static async pegarTodasPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAl();
            return res
            .status(200)
            .json(todasAsPessoas);
        } catch(error){
            return res.status(500).json(error.message)
        }
    }
}