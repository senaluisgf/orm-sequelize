const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)

    app.get('/', (req, res) => res.send("Rota Inicial da aplicação"))
}
