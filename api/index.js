const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

routes(app)

app.listen(port, (req, res) => console.log('Servidor escutando na porta '+ port));