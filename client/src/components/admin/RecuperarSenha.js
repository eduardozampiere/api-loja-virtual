import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import api from '../../api/api';
import {isAuth} from '../../auth/auth';

export default (props) => {
    const {token, email} = useParams();
	const [auth, setAuth] = useState(null);

    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);

    function submitForm(e){
        e.preventDefault();
        if(!password){
			return () => {}
		}
		api.post('/user/reset_senha', {token, email, password}).then(r => {
			alert('Senha alterada com sucesso!');
            setRedirect(true);
		}).catch(err => {
			console.log(err.response);
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


    useEffect( () => {
		let button = document.getElementsByTagName('button')[0];
		if(!button) return ()=>{};

		if(password){
			button.classList.remove('unclickable');
			button.classList.add('clickable');
		}else{
			button.classList.add('unclickable')
			button.classList.remove('clickable')
		}
	}, [password]);

    if(redirect){
        return (
            <Redirect 
				to = {{
					pathname: "/admin/login"
				}}
			/>
        )
    }

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
			<div className="login-header">Nova senha</div>
			<div className="login-body">
				<form method="post" onSubmit={e => submitForm(e)}>
					<input type="password" onKeyUp={e => isAble(e, setPassword)} name="password" placeholder="Nova senha" autoComplete="off"/>
					<button className="unclickable">Cadastrar nova senha</button>
				</form>
			</div>
		</div>

    )
};