import React from 'react';
import {BrowserRouter as Route, Switch, Link, useRouteMatch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminLogin from '../components/admin/AdminLogin';
import RecuperarSenha from '../components/admin/RecuperarSenha';
import EsqueciSenha from '../components/admin/EsqueciSenha';

function AdminRouter(){
	let { path, url } = useRouteMatch();
	
	return (
		<>
			<h2>Rotas admin</h2>
			<Link to={`${url}`}>Admin home</Link>
			<Link to={`${url}/login`}>Login</Link>
			<Switch>
				<Route exact path={path}>
					<h1>Home</h1>
				</Route>

				<Route exact path={`${path}/login`} >
					<AdminLogin sub={`${url}`}/>
				</Route>

				<Route exact path={`${path}/esqueci-senha`}>
					<EsqueciSenha />
				</Route>
				<Route>
					<h1>Rota nao encontrada</h1>
				</Route>
			</Switch>
		</>
	)
}


export default AdminRouter;