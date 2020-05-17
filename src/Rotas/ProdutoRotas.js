const express = require('express');
const rotas = express.Router();
const ProdutoController = require('../Controllers/ProdutoController');

const auth = require('../middlewares/auth');


rotas.get('/', ProdutoController.read);
rotas.get('/categoria/:categoria_id', ProdutoController.read);
rotas.get('/:id', ProdutoController.read);
rotas.get('/:id/', ProdutoController.read);
rotas.get('/promocao', ProdutoController.read);

rotas.use(auth);

rotas.post('/create', ProdutoController.create);
rotas.put('/update/:id', ProdutoController.update);
rotas.delete('/delete', ProdutoController.delete);

module.exports = rotas;