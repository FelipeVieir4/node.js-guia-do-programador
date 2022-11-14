//Model de conexão com o Banco de Dados.
const Sequelize = require("sequelize");
const sequelize = new Sequelize('nome do bd', 'usuário', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}