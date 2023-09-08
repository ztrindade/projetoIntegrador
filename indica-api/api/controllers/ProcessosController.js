const database = require('../models');

class ProcessosController{
    static async listarProcessos(req, res) {
        try {
            const listaProcessos = await database.Processos.findAll();
            return res.status(200).json(listaProcessos);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async consultarProcesso(req, res) {
        const { id } = req.params;
        try {
            const processo = await database.Processos.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(processo);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarProcesso(req, res) {
        const novoProcesso = { ...req.body };
        try {
            const processoCriado = await database.Processos.create(novoProcesso);
            return res.status(200).json(processoCriado);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizarStatusProcesso(req, res) {
        const { id } = req.params;
        const novoStatus = { ...req.body };
        try {
            await database.Processos.update(novoStatus,                 
                { where: { id : Number(id) }}
            );
            const processoAtualizado = await database.Processos.findOne(
                { where: { id : Number(id) }}
            );
            return res.status(200).json(processoAtualizado);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarProcesso(req, res) {
        const { id } = req.params;
        try {
            await database.Processos.destroy(
                { where: { id : Number(id) }}
            );
            return res.status(200).json({mensagem: `Deletado processo com id ${id}.`});
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = ProcessosController;