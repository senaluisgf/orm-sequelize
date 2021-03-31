const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.post('/pessoas', PessoaController.criarPessoa)
router.get('/pessoas', PessoaController.pegarTodasAsPessoas)
router.get('/pessoas/:pessoaId', PessoaController.pegarUmaPessoa)
router.put('/pessoas/:pessoaId', PessoaController.alterarUmaPessoa)
router.delete('/pessoas/:pessoaId', PessoaController.deletarUmaPessoa)

module.exports = router