const express = require('express');
const rotas = express.Router();
const TamanhoController = require('../Controllers/TamanhoController');

rotas.post('/create', TamanhoController.create);
rotas.get('/read', TamanhoController.read);
rotas.put('/update', TamanhoController.update);
rotas.delete('/delete', TamanhoController.delete);

module.exports = rotas;