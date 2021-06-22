const database = require('../models')
const Services = require('./Services')

class NiveisService extends Services{
    constructor(){
        super('Niveis')
    }

    async restauraNivel(nivelId){
        return await database[this.nomeDoModelo].restore({
            where: {
                id: Number(nivelId)
            }
        })
    }
}

module.exports = NiveisService