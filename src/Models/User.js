const db = require('../Database/db');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Types = db.Types;

const User = sequelize.define('users', {
	email: {
		type: Types.STRING,
		allowNull: false,
		unique: true,
	},
	nome: {
		type: Types.STRING,
		allowNull: false,
	},
	password: {
		type: Types.STRING,
		allowNull: false,
	},
	passwordResetToken: {
		type: Types.STRING
	},
	passwordResetExpires: {
		type: Types.DATE
	}

});

module.exports = User;