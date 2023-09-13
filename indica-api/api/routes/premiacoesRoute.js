const { Router } = require('express');
const PremiacaoController = require('../controllers/premiacoesController');

const router = Router();

router.get('/premiacoes', PremiacaoController.listarPremiacoes);
router.get('/premiacoes/:id', PremiacaoController.consultarPremiacao);
router.post('/premiacoes', PremiacaoController.criarPremiacao);
router.put('/premiacoes/:id', PremiacaoController.atualizarStatusPremiacao);
router.delete('/premiacoes/:id', PremiacaoController.apagarPremiacao);

module.exports = router;