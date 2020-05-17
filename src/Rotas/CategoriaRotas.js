const express = require('express');
const rotas = express.Router();
const CategoriaController = require('../Controllers/CategoriaController');
const auth = require('../middlewares/auth');

rotas.get('/read', CategoriaController.read);

rotas.use(auth);

rotas.post('/create', CategoriaController.create);
rotas.put('/update', CategoriaController.update);
rotas.delete('/delete', CategoriaController.delete);

module.exports = rotas;