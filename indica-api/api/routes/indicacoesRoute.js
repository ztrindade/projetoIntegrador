const { Router } = require('express');
const IndicacaoController = require('../controllers/indicacoesController');

const router = Router();

router.get('/indicacoes', IndicacaoController.listarTodasIndicacoes);
router.get('/indicacoes/:id', IndicacaoController.listarIndicacoesProcesso);
router.post('/indicacoes', IndicacaoController.criarIndicacao);
router.put('/indicacoes/:id', IndicacaoController.atualizarStatusIndicacao);
router.delete('/indicacoes/:id', IndicacaoController.apagarIndicacao);

module.exports = router;