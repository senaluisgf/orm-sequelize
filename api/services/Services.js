const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async criaUmRegistro(novoRegistro){
        return await database[this.nomeDoModelo].create(novoRegistro)
    }

    async pegaTodosRegistros(){
        return await database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(registroId){
        return await database[this.nomeDoModelo].findOne({where:{id: Number(registroId)}})
    }

    async alteraUmRegistro(registroId, novosDados){
        await database[this.nomeDoModelo].update(novosDados, {where: {id:Number(registroId)}})
        return this.pegaUmRegistro(registroId)
    }

    async deletaUmRegistro(registroId){
        return await database[this.nomeDoModelo].destroy({where:{id: Number(registroId)}})
    }
}

module.exports = Services