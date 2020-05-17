const express = require('express');
const rotas = express.Router();
const VarianteController = require('../Controllers/VarianteController');
const auth = require('../middlewares/auth');

rotas.get('/:produto_pai', VarianteController.read);

rotas.use(auth);

rotas.post('/create', VarianteController.create);
rotas.put('/update', VarianteController.update);
rotas.delete('/delete', VarianteController.delete);

module.exports = rotas;