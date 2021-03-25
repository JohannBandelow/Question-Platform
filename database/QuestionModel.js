//Imports necessary files
const Sequelize = require("sequelize");
const connection = require("./database");

//Creates table model
const QuestionModel = connection.define('questions', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Creates table
QuestionModel
    .sync({ force: false })
    .then(() => { console.log("Table OK!") });

//Exports tableS
module.exports = QuestionModel;