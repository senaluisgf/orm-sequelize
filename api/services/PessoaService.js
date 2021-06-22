const database = require('../models')
const Services = require('./Services')

class PessoaService extends Services{
    constructor(){
        super('Pessoas')
    }
}

module.exports = PessoaService