const database = require('../models');

class IndicacoesController{
    static async listarIndicacoes(req, res) {
        try {
            const listaIndicacoes = await database.Indicacoes.findAll();
            return res.status(200).json(listaIndicacoes);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async consultarIndicacao(req, res) {
        const { id } = req.params;
        try {
            const indicacao = await database.Indicacoes.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(indicacao);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarIndicacao(req, res) {
        const novaIndicacao = { ...req.body };
        try {
            const indicacaoCriada = await database.Indicacoes.create(novaIndicacao);
            return res.status(200).json(indicacaoCriada);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarStatusIndicacao(req, res) {
        const { id } = req.params;
        const novoStatus = { ...req.body };
        try {
            await database.Indicacoes.update(novoStatus,                 
                { where: { id : Number(id) }}
            );
            const indicacaoAtualizada = await database.Indicacoes.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(indicacaoAtualizada);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarIndicacao(req, res) {
        const { id } = req.params;
        try {
            await database.Indicacoes.destroy(
                { where: { id : Number(id) }}
            );
            return res.status(200).json({mensagem: `Deletada indicação com id ${id}.`});
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = IndicacoesController;