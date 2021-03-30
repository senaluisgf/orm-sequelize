const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegarTodasAsPessoas)
router.get('/pessoas/:pessoaId', PessoaController.pegarUmaPessoa)

module.exports = router