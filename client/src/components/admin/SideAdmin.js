import React from 'react';
import { Link } from 'react-router-dom';
import {IoMdCart, IoIosAlbums, IoIosColorPalette, IoIosResize, IoMdPricetag, IoMdPerson, IoMdPie} from 'react-icons/io';
function openSubmenu(e){
	const li = e.currentTarget;
	const ul = li.childNodes[1];
	const state = ul.style.display;
	if(state === 'none' || state === ''){
		ul.style.display = 'block';
		li.style.background = 'rgb(88, 69, 151)';
	}
	
	else{
		ul.style.display = 'none';
		li.style.background = '';
	}
}

function SideAdmin() {
	return (
		<div className="side-admin">
			<div className="side-logo">
				<img alt="logo company" src="https://www.klipfolio.com/sites/default/files/integrations/Adobe-SiteCatalyst.png"/>
				<h1>Company Name</h1>
			</div>
			<ul className="side-menu">
				<li>
					<span><Link to="/admin"><IoMdPie />Dashboard</Link></span>
				</li>

				<li onClick={(e)=>openSubmenu(e)}>
					<span><IoMdPricetag />Produtos</span>
					<ul>
						<li><Link to="/admin/produtos/list"> <IoMdCart/> Produtos</Link></li>
						<li><Link to="/admin/categorias/list"> <IoIosAlbums /> Categorias</Link></li>
						<li><Link to="/admin/cores/list"> <IoIosColorPalette /> Cores</Link></li>
						<li><Link to="/admin/tamanhos/list"> <IoIosResize /> Tamanhos</Link></li>
					</ul>
				</li>

				<li>
					<span><Link to="/admin/usuarios/list"><IoMdPerson />Usuarios</Link></span>
				</li>

			</ul>			
		</div>
	);
}

export default SideAdmin;