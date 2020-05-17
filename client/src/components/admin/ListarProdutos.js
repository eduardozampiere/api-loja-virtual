import React, { useState, useEffect } from 'react';
import {IoMdAdd} from 'react-icons/io';
import {Link} from 'react-router-dom';
import api from '../../api/api';
// import { Container } from './styles';


function ListarProdutos() {
	const [produtos, setProdutos] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [categoria, setCategoria] = useState(0);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const url = '/produto/';
		const urlFiltered = '/produto/categoria/'+categoria;
		console.log(categoria);
		api.get(categoria === 0 ? url : urlFiltered).then(r => {
			console.log(r.data);
			setProdutos(r.data);
			setLoading(false);

		}).catch(err => {
			console.log(err.response);
		});

		api.get('/categorias/read').then(r => {
			setCategorias(r.data);
			setLoading(false);
		}).catch(err => {
			console.log(err.response);
		});
	}, [categoria]);

	function renderProducts(){
		if(produtos.length <= 0) return (<tr><td>Nenhum produto encontrado</td></tr>);

		return produtos.map(produto => {
			return (
				<tr key={produto.id} >
					<td className="img-title">
						<img alt={produto.nome} src={
							produto.foto ? produto.foto[0].nome : 'https://www.ferramentastenace.com.br/wp-content/uploads/2017/11/sem-foto.jpg'
						}/>
						<Link to={`/admin/produtos/view/${produto.id}`}>
							{produto.nome}
						</Link>
						
					</td>

					<td>
						{produto.id}	
					</td>

					<td>
						{produto.preco}
					</td>

					<td>
						{produto.precoPromo}
					</td>
				</tr>
			)
		})
	}

	function renderCategories(){
		if(categorias.length <= 0) return(<option value={0}>Nenhuma categoria inserida</option>)

		return(
			<>
				<option value={0}>Todas</option>
				{categorias.map(categoria => {
					return (<option key={categoria.id} value={categoria.id}>{categoria.nome}</option>)
				})}
			</>
		) 
	}

	function changeCategory(e){
		const cat = parseInt(e.currentTarget.value);
		setCategoria(cat);
		setLoading(true);
	}

	return (
		<div>
			<div className="content-header">
				<h2>Produtos</h2>
				<div className="content-filter">
					<span>Categoria</span>
					<select onChange={changeCategory}>{renderCategories()}</select>
				</div>
			</div>
			<div className="content-body">
				<div className="content-body-header">
					<div className="content-controls">

					</div>

					<div className="content-add">
						<Link to="/admin/produtos/add"><IoMdAdd />Novo Produto</Link>
					</div>
				</div>
				<div className="content-content">
					<table>
						<thead>
							<tr>
								<th>Produto</th>
								<th>Produto ID</th>
								<th>Preço</th>
								<th>Preço Promoção</th>
							</tr>
						</thead>
						<tbody>
							{loading ? <tr><td>Carregando</td></tr> : renderProducts()}
						</tbody>

					</table>
				</div>
			</div>
		</div>
		);
}

export default ListarProdutos;