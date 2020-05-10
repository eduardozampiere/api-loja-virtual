const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;

const Produto = require('./Produto');
const Cor = require('./Cor');
const Tamanho = require('./Tamanho');

const Variante = sequelize.define('variantes', {
	estoque: {
		type: Types.INTEGER,
		default: 0,
		allowNull: false,
	},
});

Variante.belongsTo(Produto, {
	onDelete: 'CASCADE',
	foreignKey: 'produto_pai',
});

Produto.hasMany(Variante, {
	onDelete: 'CASCADE',
	foreignKey: 'produto_pai',
})

Variante.belongsTo(Cor, {
	onDelete: 'CASCADE',
	foreignKey: 'cor_id',
});

Variante.belongsTo(Tamanho, {
	onDelete: 'CASCADE',
	foreignKey: 'tamanho_id',
});

module.exports = Variante;