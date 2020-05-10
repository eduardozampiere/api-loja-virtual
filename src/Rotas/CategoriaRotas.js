const express = require('express');
const rotas = express.Router();
const CategoriaController = require('../Controllers/CategoriaController');

rotas.post('/create', CategoriaController.create);
rotas.get('/read', CategoriaController.read);
rotas.put('/update', CategoriaController.update);
rotas.delete('/delete', CategoriaController.delete);

module.exports = rotas;