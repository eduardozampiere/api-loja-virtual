const express = require('express');
const rotas = express.Router();
const TamanhoController = require('../Controllers/TamanhoController');
const auth = require('../middlewares/auth');

rotas.get('/read', TamanhoController.read);

rotas.use(auth);

rotas.post('/create', TamanhoController.create);
rotas.put('/update', TamanhoController.update);
rotas.delete('/delete', TamanhoController.delete);

module.exports = rotas;