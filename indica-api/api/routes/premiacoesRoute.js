const { Router } = require('express');
const PremiacaoController = require('../controllers/PremiacoesController');

const router = Router();

router.get('/Premiacoes', PremiacaoController.listarPremiacoes);
router.get('/Premiacoes/:id', PremiacaoController.consultarPremiacao);
router.post('/Premiacoes', PremiacaoController.criarPremiacao);
router.put('/Premiacoes/:id', PremiacaoController.atualizarStatusPremiacao);
router.delete('/Premiacoes/:id', PremiacaoController.apagarPremiacao);

module.exports = router;