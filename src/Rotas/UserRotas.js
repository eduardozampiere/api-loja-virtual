const express = require('express');
const rotas = express.Router();
const UserController = require('../Controllers/UserController');

const auth = require('../middlewares/auth');


rotas.post('/create', UserController.create);
rotas.post('/esqueci_senha', UserController.forgotPass);
rotas.post('/reset_senha', UserController.resetPass);
rotas.post('/auth', UserController.authenticate);

rotas.use(auth);
// rotas.get('/read', UserController.read);
rotas.put('/update', UserController.update);
rotas.delete('/delete', UserController.delete);


module.exports = rotas;