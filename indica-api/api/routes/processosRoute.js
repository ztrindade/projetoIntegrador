const { Router } = require('express');
const ProcessoController = require('../controllers/ProcessosController');

const router = Router();

router.get('/processos', ProcessoController.listarProcessos);
router.get('/processos/:id', ProcessoController.consultarProcesso);
router.post('/processos', ProcessoController.criarProcesso);
router.put('/processos/:id', ProcessoController.atualizarStatusProcesso);
router.delete('/processos/:id', ProcessoController.apagarProcesso);

module.exports = router;