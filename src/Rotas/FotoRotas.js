const express = require('express');
const rotas = express.Router();
const FotoController = require('../Controllers/FotoController');
const auth = require('../middlewares/auth');

rotas.get('/read', FotoController.read);

rotas.use(auth);

rotas.post('/create', FotoController.create);
rotas.put('/update', FotoController.update);
rotas.delete('/delete', FotoController.delete);

module.exports = rotas;