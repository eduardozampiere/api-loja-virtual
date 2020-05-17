import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../api/api';
import {isAuth} from '../../auth/auth';

export default (props) => {

	const [email, setEmail] = useState('');
	const [auth, setAuth] = useState(null);

	function submitForm(e){
		e.preventDefault();
		if(isEmail(email)){
			api.post('/user/esqueci_senha', {email}).then(r => {
				alert('Email enviado com sucesso!');
			}).catch(err => {
				console.log(err.response.data);
				alert(err.response.data.msg);
			});
		}
	}

	function isEmail(email){
		return true;
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

		if(email){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}else{
			button.classList.add('unclickable')
			button.classList.remove('clickable')
		}
	}, [email]);

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
			<div className="login-header">Enviar email</div>
			<div className="login-body">
				<form method="post" onSubmit={e => submitForm(e)}>
					<input type="text" onKeyUp={e => isAble(e, setEmail)} name="email" placeholder="Email" autoComplete="off"/>
					<button className="unclickable">Enviar email</button>
				</form>
			</div>
		</div>

	)
}