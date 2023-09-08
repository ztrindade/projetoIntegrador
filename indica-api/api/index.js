const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;

routes(app);

app.use(cors());
 
app.listen(port , () => {
    console.log(`Servidor disponível na porta ${port}`)}
);

module.exports = app;