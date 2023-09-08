const database = require('../models');

class PremiacoesController{
    static async listarPremiacoes(req, res) {
        try {
            const listaPremiacoes = await database.Premiacoes.findAll();
            return res.status(200).json(listaPremiacoes);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async consultarPremiacao(req, res) {
        const { id } = req.params;
        try {
            const premiacao = await database.Premiacoes.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(premiacao);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarPremiacao(req, res) {
        const novaPremiacao = { ...req.body };
        try {
            const premiacaoCriada = await database.Premiacoes.create(novaPremiacao);
            return res.status(200).json(premiacaoCriada);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarStatusPremiacao(req, res) {
        const { id } = req.params;
        const novoStatus = { ...req.body };
        try {
            await database.Premiacoes.update(novoStatus,                 
                { where: { id : Number(id) }}
            );
            const premiacaoAtualizada = await database.Premiacoes.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(premiacaoAtualizada);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarPremiacao(req, res) {
        const { id } = req.params;
        try {
            await database.Premiacoes.destroy(
                { where: { id : Number(id) }}
            );
            return res.status(200).json({mensagem: `Deletada premiação com id ${id}.`});
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = PremiacoesController;