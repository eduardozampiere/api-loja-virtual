const Cor = require('../Models/Cor');

class Controller{
	async create(req, res){
		let {nome} = req.body;
		let erros = []
		let cat;
		if(!nome){
			erros.push({
				msg: 'A cor precisa receber um nome',
			});
		}
		if(erros.length > 0){
			return res.send(erros);
		}

		req.body.nome = req.body.nome.toLowerCase().trim();

		try{
			cat = await Cor.create(req.body);
		}catch(err){
			if(err.name == 'SequelizeUniqueConstraintError'){
				cat = {
					msg: 'Ja existe essa cor no sistema',
				}
			}
		}

		return res.send(cat);
	}

	async delete(req, res){
		const {id} = req.body; 
		let cat = await Cor.destroy({
			where: {
    			id
  			}
		});

		cat = JSON.parse(cat);
		res.send({
			works: cat,
			id
		});
	}

	async update(req, res){
		const id = req.body.id;
		let cat;
		let erros = [];
		delete req.body.id;

		if(!req.body.nome){
			erros.push({
				msg: 'A cor precisa receber um nome',
			});
		}

		if(erros.length > 0){
			return res.send(erros);
		}

		try{
			cat = await Cor.update(req.body, {
				where: {
					id: id
				}
			});

			cat = { 
				works: JSON.parse(cat),
				id: id,
			}

		}catch(err){
			if(err.name == 'SequelizeUniqueConstraintError'){
				cat = {
					msg: 'Ja existe essa cor no sistema',
				}
			}
		}

		return res.send(cat);
	}

	async read(req, res){
		const cat = await Cor.findAll();
		return res.send(cat);
	}
}


module.exports = new Controller();