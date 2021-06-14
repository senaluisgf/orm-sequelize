const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.post('/pessoas', PessoaController.criarPessoa)
router.get('/pessoas', PessoaController.pegarTodasAsPessoas)
router.get('/pessoas/:pessoaId', PessoaController.pegarUmaPessoa)
router.put('/pessoas/:pessoaId', PessoaController.alterarUmaPessoa)
router.delete('/pessoas/:pessoaId', PessoaController.deletarUmaPessoa)
router.post('/pessoas/:pessoaId/restaura', PessoaController.restaurarUmaPessoa)

// Matriculas routes
router.post('/pessoas/:pessoaId/matriculas', PessoaController.criarUmaMatricula)
router.get('/pessoas/:pessoaId/matriculas/', PessoaController.pegarMatriculas)
router.get('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.pegarUmaMatricula)
router.put('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.alterarUmaMatricula)
router.delete('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.deletarUmaMatricula)
router.post('/pessoas/:pessoaId/matriculas/:matriculaId/restaura', PessoaController.restaurarUmaMatricula)

module.exports = router