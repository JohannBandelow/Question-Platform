const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '10082001', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;