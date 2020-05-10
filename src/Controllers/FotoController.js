const Foto = require('../Models/Foto');

class Controller{
	async create(req, res){
		let f = await Foto.create(req.body);
		res.send(f);
	}

	async delete(req, res){
		
	}

	async update(req, res){
		
	}

	async read(req, res){
		
	}
}


module.exports = new Controller();