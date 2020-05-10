const express = require('express');
const rotas = express.Router();
const CorController = require('../Controllers/CorController');

rotas.post('/create', CorController.create);
rotas.get('/read', CorController.read);
rotas.put('/update', CorController.update);
rotas.delete('/delete', CorController.delete);

module.exports = rotas;