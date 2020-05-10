const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;

const Tamanho = sequelize.define('tamanhos', {
	nome: {
		type: Types.STRING,
		allowNull: false,
		unique: true,
	}
});

module.exports = Tamanho;