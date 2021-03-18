const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/teste', (req, res) => {
    return res
        .status(200)
        .send({ message: 'Teste funcionando!' })
});

app.listen(port);