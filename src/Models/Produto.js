const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;
const Categoria = require('./Categoria');

const Produto = sequelize.define('produtos', {
	nome: {
		type: Types.STRING,
		allowNull: false,
	},
	slug:{
		type: Types.STRING,
		allowNull: false,
	},
	preco: {
		type: Types.FLOAT,
		allowNull: false,
	},
	precoPromo: {
		type: Types.FLOAT,
		default: 0,
	},
	validadePromocao: {
		type: Types.DATE,
		allowNull: true,
		default: null,
	},
	categoria_id: {
		type: Types.INTEGER,
		allowNull: false,
	},
	descricao: {
		type: Types.TEXT,
		allowNull: false,
	}

});
Produto.belongsTo(Categoria, {
	onDelete: 'CASCADE',
	foreignKey: 'categoria_id',
});

module.exports = Produto;