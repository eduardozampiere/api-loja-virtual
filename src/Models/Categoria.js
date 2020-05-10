const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;

const Categoria = sequelize.define('categorias', {
	nome: {
		type: Types.STRING,
		allowNull: false,
		unique: true,
	}
});

module.exports = Categoria;