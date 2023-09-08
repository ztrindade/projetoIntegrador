const { Router } = require('express');
const IndicacaoController = require('../controllers/IndicacoesController');

const router = Router();

router.get('/Indicacoes', IndicacaoController.listarIndicacoes);
router.get('/Indicacoes/:id', IndicacaoController.consultarIndicacao);
router.post('/Indicacoes', IndicacaoController.criarIndicacao);
router.put('/Indicacoes/:id', IndicacaoController.atualizarStatusIndicacao);
router.delete('/Indicacoes/:id', IndicacaoController.apagarIndicacao);

module.exports = router;