const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('loja', 'root', 'a', {
	host: 'localhost',
	dialect: 'mysql'
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize,
	Types: DataTypes,
	tryConnection: async () => {
		try{
			await sequelize.authenticate();
			console.log('Conexão estabelecida com sucesso!');
		}catch(err){
			console.log('Erro ao conectar com o banco de dados');
			console.log(err.parent.sqlMessage);
		}
	}
}