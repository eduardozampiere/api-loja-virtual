const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');

module.exports = (req, res, next) => {
	const authHeader = req.headers.auth;

	if(!authHeader){
		return res.status(401).send({msg: "Nenhum token informado"});
	}

	const parts = authHeader.split(' ');

	if(!parts.length === 2){
		return res.status(401).send({msg: "Erro no token"});
	}

	const [ pre, token ] = parts;

	if(!/^Bearer$/i.test(pre)){
		return res.status(401).send({msg: "Nenhum mal formatado"});
	}

	jwt.verify(token, auth.secret, (err, decoded) => {
		if(err) return res.status(401).send({msg: "Token inválido"});
		
		req.userId = decoded.id;
	});

	return next();

}