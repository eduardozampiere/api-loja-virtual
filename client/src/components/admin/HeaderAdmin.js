import React from 'react';
import {IoIosArrowDown, IoMdSearch} from 'react-icons/io';
// import { Link } from 'react-router-dom';

function HeaderAdmin() {
	
  return (
	<div className="header-admin">

		<div className="header-search">
			<input type="text"/>
			<button><IoMdSearch size={15} color="#ccc"/></button>
		</div>

		<div className="header-profile">
			<img alt="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQavOeCWW5ja7WWGOTHRMV21FuGLbBYWqBAxVsrHViXALvMTyZZ&usqp=CAU"/>
			<span>Carlos Eduardo <IoIosArrowDown className="user-arrow" /></span>
		</div>

	</div>
  );
}

export default HeaderAdmin;