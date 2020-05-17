const express = require('express');
const db = require('./src/Database/db');
const CategoriaRotas = require('./src/Rotas/CategoriaRotas');
const ProdutoRotas = require('./src/Rotas/ProdutoRotas');
const CorRotas = require('./src/Rotas/CorRotas');
const TamanhoRotas = require('./src/Rotas/TamanhoRotas');
const VarianteRotas = require('./src/Rotas/VarianteRotas');
const FotoRotas = require('./src/Rotas/FotoRotas');
const AuthRotas = require('./src/Rotas/AuthRotas');

const UserRotas = require('./src/Rotas/UserRotas');
const cors = require('cors');

const app = express();
db.tryConnection();
// db.sequelize.sync({force: true});

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use('/categorias', CategoriaRotas);
app.use('/produto', ProdutoRotas);
app.use('/cor', CorRotas);
app.use('/tamanho', TamanhoRotas);
app.use('/variante', VarianteRotas);
app.use('/foto', FotoRotas);
app.use('/user', UserRotas);
app.use('/auth', AuthRotas);



app.listen(3001);