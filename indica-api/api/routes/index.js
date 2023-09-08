const bodyParser = require('body-parser');
const indicacoes = require('./indicacoesRoute');
const premiacoes = require('./premiacoesRoute');
const processos = require('./processosRoute');

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(indicacoes);
    app.use(premiacoes);
    app.use(processos);
}