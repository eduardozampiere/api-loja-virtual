import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ListarProdutos from './ListarProdutos';
import InserirProduto from './InserirProduto';

const functions = {
	list: function(){
		return <ListarProdutos />
	},
	add: function(){
		return <InserirProduto />
	},
	update: function(id){
		if(!id){
			return <h1>Produto não encontrado</h1>
		}
		return <h1>Atualizar o produto {id}</h1>
	},
	view: function(id){
		if(!id){
			return <h1>Produto não encontrado</h1>
		}
		return <h1>Visalizando o produto {id}</h1>
	}
}


function Produtos() {
	let f = useParams();
	function normalize(){	
		return functions[f.func]( f.id ? parseInt(f.id) : null );
	}

	if(f.func === undefined){
		return <Redirect to="/admin/produtos/list" />
	}
	if(functions[f.func]){
		return(
			<>	
				<div>
					{normalize()}
				</div>
			</>
		);
	}

	return( 
		<div>
			<h2>Pagina não encontrada</h2>
		</div>
	)
}

export default Produtos;