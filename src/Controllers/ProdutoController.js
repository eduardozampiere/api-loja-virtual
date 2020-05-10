const Produto = require('../Models/Produto');
const Foto = require('../Models/Foto');
const Variante = require('../Models/Variante');
const {Op} = require('sequelize');
class Controller{
	async create(req, res){
		let data = req.body;
		let {nome, preco, precoPromo, validadePromocao, categoria_id, descricao} = data;
		let erros = []
		let prod;
		if(!nome){
			erros.push({
				mgs: 'O produto precisa ter um nome.',
			})
		}else{
			data.slug = nome.toLowerCase().trim().replace(/ /g, '-');
		}

		if(!preco){
			erros.push({
				mgs: 'O produto precisa ter um preço.',
			})
		}else if(parseFloat(preco) <= 0){
			erros.push({
				mgs: 'O preço precisa ser um valor maior que zero.',
			})
		}else{
			data.preco = parseFloat(preco);
		}

		if(!precoPromo){
			data.precoPromo = 0;
		}

		if(!categoria_id){
			erros.push({
				mgs: 'O produto precisa ter uma categoria',
			})
		}

		if(!descricao){
			erros.push({
				mgs: 'O produto precisa ter uma descrição',
			})
		}

		if(erros.length > 0){
			return res.send(erros);
		}

		data.nome = data.nome.toLowerCase().trim();

		try{
			prod = await Produto.create(data);
		}catch(err){
			console.log(err);
			prod = {
				msg: "Houve um erro.",
			}
		}

		return res.send(prod);
	}

	async delete(req, res){
		const {id} = req.body; 
		let cat = await Produto.destroy({
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
		//Tratar depois
		const id = req.params.id;
		let erros = [];
		let prod;
		try{
			prod = await Produto.update(req.body, {
				where: {
					id: id
				}
			});

			prod = { 
				works: JSON.parse(prod),
				id: id,
			}

		}catch(err){
			prod = {
				msg: 'Houve um erro ao atualizar o produto.',
			}
			
		}

		return res.send(prod);
	}

	async read(req, res){
		const {id, categoria_id} = req.params;
		let prod;
		if(categoria_id){
			//Mostrar por categoria
			prod = await Produto.findAll({where:{categoria_id}, include: ['categoria', {
				model: Foto
			}]});
		}
		
		else if(!id) prod = await Produto.findAll({
			include: [{
				model: Foto
			}]
		});

		else if(id === 'promocao'){
			//Mostrar por promocao
			prod = await Produto.findAll({
				where:{
					precoPromo:{
						[Op.gt]: 0,
					}
				},
				include: ['categoria', {
					model: Foto
				}]
			})
		}

		else prod = await Produto.findByPk(id, {include: ['categoria', {
			model: Foto
		},{
			model: Variante
			}]
		});
		
		return res.send(prod);
	}
}


module.exports = new Controller();