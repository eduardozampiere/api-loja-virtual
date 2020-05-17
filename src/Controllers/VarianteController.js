const Variante = require('../Models/Variante');
const Produto = require('../Models/Produto');
const Foto = require('../Models/Foto');

class Controller{
	async create(req, res){
		const variantes = req.body;
		let data = req.body;
		let erros = [];
		let v;
		for(let i in variantes){
			const {estoque, produto_pai, cor_id, tamanho_id} = variantes[i];
			if(!estoque){
				data.estoque = 0;
			}
	
			if(!produto_pai){
				erros.push({
					mgs: 'Produto inválido.',
				});
			}
			if(!cor_id){
				erros.push({
					mgs: 'Selecione uma cor.',
				});
			}
			if(!tamanho_id){
				erros.push({
					mgs: 'Selecione um tamanho.',
				});
			}
			if(erros.length > 0){
				return res.send(erros);
			}

			try{
				v = await Variante.create({
					estoque,
					produto_pai,
					cor_id,
					tamanho_id
				});
			}
			catch(err){
				if(err.name == 'SequelizeForeignKeyConstraintError'){
					let field = err.fields[0];
					if(field === 'produto_pai'){
						return res.send({msg: 'Produto pai inexistente'})
					}
					else if(field === 'cor_id'){
						return res.send({msg: 'Cor inexistente'})	
					}
					else if(field === 'tamanho_id'){
						return res.send({msg: 'Tamanho inexistente'})	
					}
				}
			}
		}
		return res.send({ok:true});
	}

	async delete(req, res){
		const {id} = req.body; 
		let cat = await Variante.destroy({
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
		
		return res.send({ok: true});
	}

	async read(req, res){
		let variantes, pai;
		const {produto_pai} = req.params;

		variantes = await Variante.findAll({
			where: {
				produto_pai
			},
			include: ['core', 'tamanho'],
			/*
				Esses nomes são os nomes das tabelas definidos no model
				sem o s no final.
			*/
		});

		pai = await Produto.findAll({
			where: {
				id: produto_pai,
			},
			include:['categoria', {
				model: Foto
			}]
		})
		return res.send({variantes, pai})
	}
}


module.exports = new Controller();