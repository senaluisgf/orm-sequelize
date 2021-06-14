const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.post('/turmas', TurmaController.criarUmaTurma)
router.get('/turmas', TurmaController.pegarTodasAsTurmas)
router.get('/turmas/:turmaId', TurmaController.pegarUmaTurma)
router.put('/turmas/:turmaId', TurmaController.alterarUmaTurma)
router.delete('/turmas/:turmaId', TurmaController.deletarUmaTurma)
router.post('/turmas/:turmaId/restaura', TurmaController.restaurarUmaTurma)

module.exports = router