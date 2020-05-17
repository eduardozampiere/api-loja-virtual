import React, { useState, useEffect } from 'react';
import api from '../../api/api';

// import { Container } from './styles';

function InserirProduto() {

	const [categorias, setCategorias] = useState([]);

	//Usadas para gerar as cores e os tamanhos
	let [cores, setCores] = useState([]);
	let [tamanhos, setTamanhos] = useState([]);

	let [variantes, setVariantes] = useState([]);

	//Cores e tamanhos selecionados
	let [coresSelected, setCoresSelected] = useState([]);
	let [tamanhosSelected, setTamanhosSelected] = useState([]);

	useEffect(() => {
		api.get('/cor/read').then(r => {
			setCores(r.data);
		}).catch(err => {
			console.log(err.response)
		});

		api.get('/tamanho/read').then(r => {
			setTamanhos(r.data);
		}).catch(err => {
			console.log(err.response)
		});

		api.get('/categorias/read').then(r => {
			setCategorias(r.data);
		}).catch(err => {
			console.log(err.response);
		});

	}, []);

	useEffect(() => {
		console.log(variantes);
		let button = document.getElementsByClassName('btn-cadastrar')[0];
		if(variantes.length <= 0){
			button.classList.add('unclickable');
		}
		else{
			button.classList.remove('unclickable');
		}
	}, [variantes]);

	function selectItem(e, array, f){
		const self = e.currentTarget;
		const item = self.attributes.value.value;
		
		let classes = self.classList;
		let pos = array.indexOf(item);
		if( pos === -1){
			f([...array, item]);
			classes.add('added');
		}
		else{
			array.splice(pos, 1);
			f(array)
			classes.remove('added')
		}
	}

	function renderCategories(){
		if(categorias.length <= 0) return(<option value={0}>Nenhuma categoria inserida</option>)

		return categorias.map(categoria => {
					return (<option key={categoria.id} value={categoria.id}>{categoria.nome}</option>)
				})
	}

	function renderCores(){
		return cores.map(cor => {
			return(
				<div className={`cor ${cor.nome}`} onClick={(e) => selectItem(e, coresSelected, setCoresSelected)}  value={cor.id} />
			)
		})
	}

	function renderTamanhos(){
		return tamanhos.map(tamanho => {
			return (
				<div className={`tamanho ${tamanho.nome}`} onClick={(e) => selectItem(e, tamanhosSelected, setTamanhosSelected)}  value={tamanho.id}>
					{tamanho.nome}	
				</div>
				
			)
		})
	}

	function nameColor(id){
		for(let i in cores){
			let cor = cores[i];
			
			if(cor.id === parseInt(id) ) return cor.nome;
		}
	}

	function nameTamanho(id){
		for(let i in tamanhos){
			let tamanho = tamanhos[i];
			if(tamanho.id === parseInt(id) ) return tamanho.nome;
		}
	}

	function renderVariantes(){
		return variantes.map((variante, k) => {
			return (
				<div className="variante">
					<div className={`cor ${nameColor(variante.cor_id)}`}>
						
					</div>
					<div className="tamanho">
						{nameTamanho(variante.tamanho_id)}
					</div>
					<div>
						<input type="number" onKeyUp={(e) => addEstoque(e, k)} placeholder="Estoque" autoComplete="off"/>
					</div>
				</div>
			)
		})
	}

	function addEstoque(e, k){
		variantes[k].estoque = parseInt(e.currentTarget.value);
		setVariantes(variantes);
	}

	function gerarVariante(e){
		e.preventDefault();
		let arr = [];
		for(let i in coresSelected){
			for(let j in tamanhosSelected){
				arr.push({
					cor_id: coresSelected[i],
					tamanho_id: tamanhosSelected[j],
					estoque: 0,
					produto_pai: 0
				})
			}
		}
		setVariantes(arr);
	}

	async function cadastrar(e){
		e.preventDefault();
		if(variantes.length <= 0){
			return false;
		}
		const form = e.currentTarget.elements;
		let photos = [];

		let produto = {
			'nome': form.title.value,
			'preco': form.price.value,
			'precoPromo': form.promoPrice.value === '' ? null : form.promoPrice.value,
			'validadePromocao': form.promoValidate.value === '' ? null : form.promoValidate.value,
			'categoria_id': form.category.value === 0 ? null : form.category.value,
			'descricao': form.description.value
		}

		const config = {
            headers: {
                auth: localStorage.getItem('@token')
            }
        }

		try{
			let r = await api.post('/produto/create', produto, config);
			if(r.data.id){
				//Inserir variantes
				const id = r.data.id;
				variantes.map(variante => {
					return variante.produto_pai = id;
				})
				setVariantes(variantes);
				await api.post('/variante/create', variantes, config);

			}
			else throw {response: r.data};
			
		}catch(err){
			console.log(err.response);
		}
	}

	return (
		<div>
			<div className="content-header">
				<h2>Produtos</h2>
			</div>

			<div className="content-body">
				<div className="content-content">
					<form className="content-form" onSubmit={cadastrar}>
						<input type="text" name="title" placeholder="Titulo do produto" autoComplete="off"/>
						<div>
							<input type="number" name="price" placeholder="Preço do produto" autoComplete="off"/>
							<select name="category">
								{renderCategories()}
							</select>
							<input type="file" name="photos[]" placeholder="Selecione as fotos" />
						</div>
						<div className="promo-check">
							<div className="checkbox">
							</div>
							<label form="promo">Promoção</label>
						</div>
						<div className="div-promo">
							<input type="number" name="promoPrice" placeholder="Preço promoção" autoComplete="off"/>
							<input type="date" name="promoValidate" placeholder="Validade da promoção" autoComplete="off"/>
						</div>

						<div className="cores">
							{renderCores()} 
						</div>

						<div className="tamanhos">
							{renderTamanhos()}
						</div>
						<button onClick={gerarVariante} className="btn-gerar-variantes">Gerar Variantes</button>
						<div className="variantes">
							{renderVariantes()}
						</div>
						<textarea name="description" placeholder="Descrição do produto">

						</textarea>
						<button className="unclickable btn-cadastrar">Cadastrar</button>
					</form>
				</div>
			</div>

		</div>
	);
}

export default InserirProduto;