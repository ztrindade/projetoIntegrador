const { Router } = require('express');
const PremiacaoController = require('../controllers/PremiacoesController');

const router = Router();

router.get('/premiacoes', PremiacaoController.listarTodasPremiacoes);
router.get('/premiacoes/:id', PremiacaoController.listarPremiacoesProcesso);
router.post('/premiacoes', PremiacaoController.criarPremiacao);
router.put('/premiacoes/:id', PremiacaoController.atualizarStatusPremiacao);
router.delete('/premiacoes/:id', PremiacaoController.apagarPremiacao);

module.exports = router;