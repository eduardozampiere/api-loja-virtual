const express = require('express');
const rotas = express.Router();
const CorController = require('../Controllers/CorController');
const auth = require('../middlewares/auth');

rotas.get('/read', CorController.read);

rotas.use(auth);

rotas.post('/create', CorController.create);
rotas.put('/update', CorController.update);
rotas.delete('/delete', CorController.delete);

module.exports = rotas;