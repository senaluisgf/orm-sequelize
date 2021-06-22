const database = require('../models')
const Services = require('./Services')

class PessoasService extends Services{
    constructor(){
        super('Pessoas')
    }
}

module.exports = PessoasService