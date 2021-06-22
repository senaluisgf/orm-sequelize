const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.post('/pessoas', PessoaController.criarPessoa)
router.get('/pessoas', PessoaController.pegarTodasPessoas)
router.get('/pessoas/inativos', PessoaController.pegarPessoasInativas)
router.get('/pessoas/ativos', PessoaController.pegarPessoasAtivas)
router.get('/pessoas/:pessoaId', PessoaController.pegarUmaPessoa)
router.put('/pessoas/:pessoaId', PessoaController.alterarUmaPessoa)
router.delete('/pessoas/:pessoaId', PessoaController.deletarUmaPessoa)
router.post('/pessoas/:pessoaId/restaura', PessoaController.restaurarUmaPessoa)

router.post('/pessoas/:pessoaId/cancela', PessoaController.cancelarPessoa)

// Matriculas routes
router.post('/pessoas/:pessoaId/matriculas', PessoaController.criarUmaMatricula)
router.get('/pessoas/:pessoaId/matriculas/', PessoaController.pegarMatriculas)
router.get('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.pegarUmaMatricula)
router.put('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.alterarUmaMatricula)
router.delete('/pessoas/:pessoaId/matriculas/:matriculaId', PessoaController.deletarUmaMatricula)
router.post('/pessoas/:pessoaId/matriculas/:matriculaId/restaura', PessoaController.restaurarUmaMatricula)
router.get('/pessoas/:pessoaId/matriculas-confirmadas', PessoaController.pegarMatriculasConfirmadas)
router.get('/pessoas/:pessoaId/matriculas-canceladas', PessoaController.pegarMatriculasCanceladas)
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegarMatriculasPorTurma)
router.get('/pessoas/matriculas/lotadas', PessoaController.pegarMatriculasLotadas)

module.exports = router