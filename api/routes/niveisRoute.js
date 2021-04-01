const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()

router.post('/niveis', NivelController.criarNivel)
router.get('/niveis', NivelController.pegarTodosOsNiveis)
router.get('/niveis/:nivelId', NivelController.pegarUmNivel)
router.put('/niveis/:nivelId', NivelController.alterarUmNivel)
router.delete('/niveis/:nivelId', NivelController.deletarUmNivel)

module.exports = router