const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;
const Produto = require('./Produto');

const Foto = sequelize.define('fotos', {
	nome: {
		type: Types.STRING,
		allowNull: false,
		unique: true,
	},
	index: {
		type: Types.INTEGER,
	}
});

Foto.belongsTo(Produto, {
	onDelete: 'CASCADE',
	foreignKey: 'produtoId',
});

Produto.hasMany(Foto, {
	foreignKey: 'produtoId'
});

module.exports = Foto;