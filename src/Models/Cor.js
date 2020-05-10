const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;

const Cor = sequelize.define('cores', {
	nome: {
		type: Types.STRING,
		allowNull: false,
		unique: true,
	}
});

module.exports = Cor;