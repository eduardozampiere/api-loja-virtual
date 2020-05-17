import React, {useState, useEffect} from 'react';
import api from '../../api/api';
import {Redirect, Link} from 'react-router-dom';
import {isAuth} from '../../auth/auth';
// import EsqueciSenha from './EsqueciSenha';

function AdminLogin(props){
	const emailRef = React.createRef();
	const passRef = React.createRef();
	const [auth, setAuth] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPass] = useState('');


	function submitForm(e){
		e.preventDefault();
		if(!email || !password){
			return () => {}
		}
		api.post('/user/auth', {email, password}).then(r => {
			
			localStorage.setItem("@token", 'BEARER '+r.data.token);
			alert('Login realizado!');
			setAuth(true);

		}).catch(err => {
			alert(err.response.data.msg);
		});
	}

	function isAble(e, f){
		let value = e.currentTarget.value;
		if(value){
			f(value);
		}
		else{
			f('');
		}
	}

	useEffect( () => {
		let button = document.getElementsByTagName('button')[0];
		if(!button) return ()=>{};

		if(email && password){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}else{
			button.classList.add('unclickable')
			button.classList.remove('clickable')
		}
	}, [email, password]);

	useEffect( () => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			let r = await isAuth(signal)
			setAuth(r);
		})();

		return () => {
			abortController.abort();
		};

	}, []);

	if(auth === null){
		return (<div></div>)
	}
	else if(auth){
		return(
			<Redirect 
				to = {{
					pathname: "/admin"
				}}
			/>
		)
	}

	return (
		<div className="login-content">
			<div className="login-header">Log In</div>
			<div className="login-body">
				<form method="post" onSubmit={e => submitForm(e)}>
					<input type="text" onKeyUp={e => isAble(e, setEmail)} ref={emailRef} name="email" placeholder="Email" autoComplete="off"/>
					<input type="password" onKeyUp={e => isAble(e, setPass)} ref={passRef} name="password" placeholder="Senha" autoComplete="off"/>
					<button className="unclickable">Login</button>
					
				</form>
				<div className="recuperar-senha">

					<Link to="/admin/esqueci-senha">
						Esqueci minha senha
					</Link>
				</div>
			</div>
		</div>
	)
	
}

export default AdminLogin;