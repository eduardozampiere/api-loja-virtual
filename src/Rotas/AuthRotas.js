const express = require('express');
const rotas = express.Router();
const auth = require('../middlewares/auth');

rotas.use(auth);

rotas.post('/', async (req, res) => {
    res.send({ok: true})
});

module.exports = rotas;