const express = require('express');
const rotas = express.Router();
const FotoController = require('../Controllers/FotoController');

rotas.post('/create', FotoController.create);
rotas.get('/read', FotoController.read);
rotas.put('/update', FotoController.update);
rotas.delete('/delete', FotoController.delete);

module.exports = rotas;