const express = require('express');
const rotas = express.Router();
const VarianteController = require('../Controllers/VarianteController');

rotas.post('/create', VarianteController.create);
rotas.get('/:produto_pai', VarianteController.read);
rotas.put('/update', VarianteController.update);
rotas.delete('/delete', VarianteController.delete);

module.exports = rotas;