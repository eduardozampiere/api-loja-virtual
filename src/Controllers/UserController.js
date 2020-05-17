const User = require('../Models/User');
const mailer = require('../modules/mailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../config/auth.json');
const crypto = require('crypto');

function generateToken(params = {}){
	return jwt.sign(params, auth.secret, { expiresIn: 86400});
}

class Controller{
	async create(req, res){
		let data = req.body;
		data.password = await bcrypt.hash(data.password, 10);
		let user;
		try{
			if( await User.findOne({where: {email: data.email}}) ){
				return res.status(400).send({ msg: "O email já está cadastrado!"})				
			}
			user = await User.create(data);
		}catch(err){
			return res.status(500).send({ msg: "Houve um erro interno"})
		}
		user.password = undefined;
		user.passwordResetExpires = undefined;
		user.passwordResetToken = undefined;

		let token = generateToken({id: user.id});
		res.set({'auth': token});
		
		return res.send({ user, token: token });
	}

	async authenticate(req, res){
		const {email, password} = req.body;

		const user = await User.findOne({
			where: {
				email,
			}
		});


		if(!user){
			return res.status(400).send({ msg: "Usuario nao encontrado"});
		}

		try{
			if(! await bcrypt.compare(password, user.password)){
				return res.status(400).send({ msg: "Senha inválida"});
			}
		}catch(err){
			return res.status(400).send({ msg: "Senha inválida"});
		}

		user.password = undefined;
		user.passwordResetExpires = undefined;
		user.passwordResetToken = undefined;

		let token = generateToken({id: user.id});
		res.set({'auth': token});
		console.log('aaa');
		return res.send({ user, token:  generateToken({id: user.id})});
	}

	async forgotPass(req, res){
		const {email} = req.body;

		try{
			const user = await User.findOne({
				where:{
					email
				}
			});

			if(!user) return res.status(400).send({ msg: "Usuario nao encontrado"});

			const token = crypto.randomBytes(20).toString('hex');
			const now = new Date();
			now.setHours(now.getHours() + 1);

			await User.update({
				passwordResetToken: token,
				passwordResetExpires: now
			}, {
				where:{
					id: user.id
				}
			});

			mailer.sendMail({
				to: email,
				from: 'eduardo@company.com',
				template: 'esqueci_senha',
				context: {token, email}
			}, err => {
				if(err){
					return res.status(400).send({msg: "Houve um erro ao enviar o email. Tente novamente mais tarde."})
				}

				return res.send({ok: true});
			})
			return res.status(200).send({ok:true})
		}catch(err){
			console.log(err);
			return res.status(400).send({msg: "Houve um erro interno"})
		}
	}

	async resetPass(req, res){
		const {email, token, password} = req.body;

		try{

			const user = await User.findOne({
				where:{
					email
				}
			});

			if(!user) return res.status(400).send({ msg: "Usuario nao encontrado"});

			if(token !== user.passwordResetToken) return res.status(400).send({ msg: "Token inválido"});

			const now = new Date();
			if( now > user.passwordResetExpires) return res.status(400).send({ msg: "Essa requisição não é mais válida"});

			user.passwordResetExpires = null;
			user.passwordResetToken = null;
			user.password = await bcrypt.hash(password, 10);
			user.save();

		}catch(err){
			console.log(err);
			return res.status(400).send({msg: 'Houve um erro interno'});
		}
		return res.status(200).send({ok: true});

	}

	async delete(req, res){
		return res.send({ok: true});
	}

	async update(req, res){
		return res.send({ok: true});
	}

	async read(req, res){
		return res.send({ok: true});
	}
}


module.exports = new Controller();