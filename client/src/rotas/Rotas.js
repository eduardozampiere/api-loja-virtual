import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminLogin from '../components/admin/AdminLogin';
import RecuperarSenha from '../components/admin/RecuperarSenha';
import EsqueciSenha from '../components/admin/EsqueciSenha';
import Admin from '../components/admin/Admin';
import Produtos from '../components/admin/Produtos';

function Rotas() {
  return (
    <Router>
        <Switch>
            {/* Rotas da loja */}
            <Route path="/" exact>
                <h1>Pagina da loja</h1>
            </Route>
            

            {/* Rotas de admin */}
            <PrivateRoute exact path="/admin">
				<Admin>
                    <h2>Conteudo</h2>
                </Admin>
			</PrivateRoute>

			<Route path="/admin/login" >
				<AdminLogin sub="admin"/>
			</Route>

			<Route path="/admin/esqueci-senha">
				<EsqueciSenha />
			</Route>
			
            <Route exact path="/admin/recuperar-senha/:token/:email">
                <RecuperarSenha />
            </Route>

            <PrivateRoute path="/admin/produtos/:func?/:id?/">
                <Admin>
                    <Produtos />
                </Admin>
            </PrivateRoute>

            <PrivateRoute path="/admin/categorias/:func?/:id?/">
                <Admin>
                    <h2>Categorias</h2>
                </Admin>
            </PrivateRoute>

            <PrivateRoute path="/admin/cores/:func?/:id?/">
                <Admin>
                    <h2>Cores</h2>
                </Admin>
            </PrivateRoute>

            <PrivateRoute path="/admin/tamanhos/:func?/:id?/">
                <Admin>
                    <h2>Tamanhos</h2>
                </Admin>
            </PrivateRoute>

            <PrivateRoute path="/admin/usuarios/:func?/:id?/">
                <Admin>
                    <h1>Usuarios</h1>
                </Admin>
            </PrivateRoute>

            <Route>
                <h1>Pagina nao encontrada</h1>
            </Route>
        </Switch>

    </Router>
  );
}

export default Rotas;