import React, {useState, useEffect} from 'react';
import {isAuth } from '../auth/auth';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute({children, ...rest}){
	const [auth, setAuth] = useState(null);
		
	useEffect(() => {
		isAuth().then(r => {
			setAuth(r);
		});
	}, []);

	if(auth === null){
		return (<h3>Loading</h3>)
	}
	else if(!auth){
	
		return(
			<Redirect 
				to = {{
					pathname: "/admin/login"
				}}
			/>
		)
	}

	return(
		<Route {...rest}>
			{children}
		</Route>    
	)
}

export default PrivateRoute;